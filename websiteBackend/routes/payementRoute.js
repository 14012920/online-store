const router = require('express').Router();
const crypto = require('crypto');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: 'rzp_test_U1odAZx2aIXLbD',
  key_secret: 'MvKndbYci2ujSvenYcC7pNiS',
});

router.post('/verification', (req, res) => {
  const secret = process.env.SECRET_KEY;
  console.log(req.body);

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');
  console.log(digest, req.headers['x-razorpay-signature']);

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('request is legit');
    // process it
    require('fs').writeFileSync(
      'payment1.json',
      JSON.stringify(req.body, null, 4),
    );
  } else {
    // pass it
    console.log('in else');
  }
  res.json({ status: 'ok' });
});

router.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = 499;
  const currency = 'INR';
  console.log(req.body);
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
