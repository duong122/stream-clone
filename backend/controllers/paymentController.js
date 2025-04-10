const moment = require('moment');
const querystring = require('qs');
const crypto = require("crypto");
const request = require('request');
const config = require('config');

function sortObject(obj) {
	let sorted = {};
	let str = [];
	for (let key in obj){
		if (obj.hasOwnProperty(key)) str.push(encodeURIComponent(key));
	}
	str.sort();
	for (let i = 0; i < str.length; i++) {
		sorted[str[i]] = encodeURIComponent(obj[str[i]]).replace(/%20/g, "+");
	}
	return sorted;
}

exports.renderOrderList = (req, res) => {
	res.render('orderlist', { title: 'Danh sách đơn hàng' });
};

exports.renderCreatePayment = (req, res) => {
	res.render('order', { title: 'Tạo mới đơn hàng', amount: 10000 });
};

exports.renderQueryDR = (req, res) => {
	res.render('querydr', { title: 'Truy vấn kết quả thanh toán' });
};

exports.renderRefund = (req, res) => {
	res.render('refund', { title: 'Hoàn tiền giao dịch thanh toán' });
};

exports.createPaymentUrl = (req, res) => {
	process.env.TZ = 'Asia/Ho_Chi_Minh';
	let date = new Date();
	let createDate = moment(date).format('YYYYMMDDHHmmss');

	let ipAddr = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;

	let tmnCode = config.get('vnp_TmnCode');
	let secretKey = config.get('vnp_HashSecret');
	let vnpUrl = config.get('vnp_Url');
	let returnUrl = config.get('vnp_ReturnUrl');
	let orderId = moment(date).format('DDHHmmss');
	let amount = req.body.amount;
	let bankCode = req.body.bankCode;
	let locale = req.body.language || 'vn';

	let vnp_Params = {
		'vnp_Version': '2.1.0',
		'vnp_Command': 'pay',
		'vnp_TmnCode': tmnCode,
		'vnp_Locale': locale,
		'vnp_CurrCode': 'VND',
		'vnp_TxnRef': orderId,
		'vnp_OrderInfo': 'Thanh toan cho ma GD:' + orderId,
		'vnp_OrderType': 'other',
		'vnp_Amount': amount * 100,
		'vnp_ReturnUrl': returnUrl,
		'vnp_IpAddr': ipAddr,
		'vnp_CreateDate': createDate
	};

	if (bankCode) vnp_Params['vnp_BankCode'] = bankCode;

	vnp_Params = sortObject(vnp_Params);

	let signData = querystring.stringify(vnp_Params, { encode: false });
	let hmac = crypto.createHmac("sha512", secretKey);
	let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

	vnp_Params['vnp_SecureHash'] = signed;
	vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

	res.redirect(vnpUrl);
};

exports.vnpayReturn = (req, res) => {
	let vnp_Params = req.query;
	let secureHash = vnp_Params['vnp_SecureHash'];

	delete vnp_Params['vnp_SecureHash'];
	delete vnp_Params['vnp_SecureHashType'];

	vnp_Params = sortObject(vnp_Params);

	let secretKey = config.get('vnp_HashSecret');
	let signData = querystring.stringify(vnp_Params, { encode: false });
	let hmac = crypto.createHmac("sha512", secretKey);
	let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

	res.render('success', {
		code: secureHash === signed ? vnp_Params['vnp_ResponseCode'] : '97'
	});
};

exports.vnpayIpn = (req, res) => {
	let vnp_Params = req.query;
	let secureHash = vnp_Params['vnp_SecureHash'];

	delete vnp_Params['vnp_SecureHash'];
	delete vnp_Params['vnp_SecureHashType'];
	vnp_Params = sortObject(vnp_Params);

	let secretKey = config.get('vnp_HashSecret');
	let signData = querystring.stringify(vnp_Params, { encode: false });
	let hmac = crypto.createHmac("sha512", secretKey);
	let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

	let checkOrderId = true;
	let checkAmount = true;
	let paymentStatus = '0';

	if (secureHash === signed) {
		if (checkOrderId && checkAmount) {
			if (paymentStatus === "0") {
				if (vnp_Params['vnp_ResponseCode'] === "00") {
					// update db status = success
				} else {
					// update db status = failed
				}
				res.status(200).json({ RspCode: '00', Message: 'Success' });
			} else {
				res.status(200).json({ RspCode: '02', Message: 'Already processed' });
			}
		} else {
			res.status(200).json({ RspCode: checkOrderId ? '04' : '01', Message: checkOrderId ? 'Amount invalid' : 'Order not found' });
		}
	} else {
		res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
	}
};

exports.queryTransaction = (req, res) => {
	process.env.TZ = 'Asia/Ho_Chi_Minh';
	let date = new Date();

	let vnp_TmnCode = config.get('vnp_TmnCode');
	let secretKey = config.get('vnp_HashSecret');
	let vnp_Api = config.get('vnp_Api');

	let vnp_TxnRef = req.body.orderId;
	let vnp_TransactionDate = req.body.transDate;
	let vnp_RequestId = moment(date).format('HHmmss');
	let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
	let vnp_IpAddr = req.connection.remoteAddress;
	let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

	let data = `${vnp_RequestId}|2.1.0|querydr|${vnp_TmnCode}|${vnp_TxnRef}|${vnp_TransactionDate}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;
	let hmac = crypto.createHmac("sha512", secretKey);
	let vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest("hex");

	request({
		url: vnp_Api,
		method: "POST",
		json: true,
		body: {
			vnp_RequestId, vnp_Version: '2.1.0', vnp_Command: 'querydr', vnp_TmnCode,
			vnp_TxnRef, vnp_OrderInfo, vnp_TransactionDate, vnp_CreateDate,
			vnp_IpAddr, vnp_SecureHash
		}
	}, (error, response, body) => {
		console.log(response);
	});
};

exports.refundTransaction = (req, res) => {
	process.env.TZ = 'Asia/Ho_Chi_Minh';
	let date = new Date();

	let vnp_TmnCode = config.get('vnp_TmnCode');
	let secretKey = config.get('vnp_HashSecret');
	let vnp_Api = config.get('vnp_Api');

	let vnp_TxnRef = req.body.orderId;
	let vnp_TransactionDate = req.body.transDate;
	let vnp_Amount = req.body.amount * 100;
	let vnp_TransactionType = req.body.transType;
	let vnp_CreateBy = req.body.user;
	let vnp_RequestId = moment(date).format('HHmmss');
	let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');
	let vnp_IpAddr = req.connection.remoteAddress;
	let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

	let data = `${vnp_RequestId}|2.1.0|refund|${vnp_TmnCode}|${vnp_TransactionType}|${vnp_TxnRef}|${vnp_Amount}|0|${vnp_TransactionDate}|${vnp_CreateBy}|${vnp_CreateDate}|${vnp_IpAddr}|${vnp_OrderInfo}`;
	let hmac = crypto.createHmac("sha512", secretKey);
	let vnp_SecureHash = hmac.update(Buffer.from(data, 'utf-8')).digest("hex");

	request({
		url: vnp_Api,
		method: "POST",
		json: true,
		body: {
			vnp_RequestId, vnp_Version: '2.1.0', vnp_Command: 'refund',
			vnp_TmnCode, vnp_TransactionType, vnp_TxnRef, vnp_Amount,
			vnp_TransactionNo: '0', vnp_CreateBy, vnp_OrderInfo, vnp_TransactionDate,
			vnp_CreateDate, vnp_IpAddr, vnp_SecureHash
		}
	}, (error, response, body) => {
		console.log(response);
	});
};


