<!-- Intregate Razorpay -->

Steps :- 
1. Install Razorpay using npm install

2. Create instance of Razorpay using  <!-- new Razorpay({}) --> and provide object with some key values
    1. KEY_ID
    2. KEY_SECRET
    3. headers: for example {"x-Razorpay-Amount": "account"}
    <!-- these things come from your razorpay account which was already created on reazorpay website -->

3. We need to refer every request as an order

4. create order using <!-- instance.order.create({}) -->

5. we need to provide some things which is mandatory in create object
    1. Amount: we need to multiply our real amount by 100 for example our amount is 300 then  afte multiply it is 30000 now razorpay teat it is 300.00
    2. we need to provide currency for India "INR"
    <!-- these two things mandatory other optional like :
     receipt etc. -->

