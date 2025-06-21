exports.emailVerification = (otp)=>{
    return `<!DOCTYPE html>
<html>
<head>
    <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    </style>
</head>
<body class="bg-gray-100">
    <div class="max-w-lg mx-auto my-10 bg-white rounded-lg border border-gray-200 shadow-md">
        <!-- Header -->
        <div class="bg-green-600 text-white text-center py-4 rounded-t-lg">
            <h1 class="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#6674CC] via-[purple] to-[orange] ">EduElevate</h1>
            <p class="text-sm">Account Verification</p>
        </div>

        <!-- Content -->
        <div class="p-6">
            <p class="text-gray-700 text-lg">Hello,</p>
            <p class="text-gray-600 mt-2">
                Thank you for signing up on <strong class="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#6674CC] via-[purple] to-[orange] ">EduElevate</strong>. To complete your account verification, please use the OTP below:
            </p>
            <div class="bg-gray-100 border border-gray-300 text-green-600 text-center text-xl font-bold py-3 px-4 rounded-lg my-4">
                ${otp}      
            </div>
            <p class="text-gray-600">
                This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone.
            </p>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 text-gray-500 text-sm text-center py-3 rounded-b-lg">
            If you didn’t request this, please ignore this email or contact support at 
            <a href="mailto:support@eduelevate.com" class="text-green-600 underline">support@eduelevate.com</a>.
        </div>
    </div>
</body>
</html>
`
}