const nodemailer = require('nodemailer');

// Create transporter (configure with your email service)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to Delish! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316; text-align: center;">Welcome to Delish!</h1>
          <p>Hello ${user.name},</p>
          <p>Thank you for joining Delish! We're excited to have you on board.</p>
          <p>With Delish, you can:</p>
          <ul>
            <li>Order from your favorite restaurants</li>
            <li>Subscribe to healthy tiffin services</li>
            <li>Track your orders in real-time</li>
            <li>Save your favorite meals</li>
          </ul>
          <p>Start exploring delicious food options now!</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}" 
               style="background: #f97316; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 8px; display: inline-block;">
              Start Ordering
            </a>
          </div>
          <p>Happy eating! 🍕🍔🍜</p>
          <p><strong>The Delish Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', user.email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

// Send order confirmation email
exports.sendOrderConfirmation = async (order, user) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmed - ${order.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316; text-align: center;">Order Confirmed! 🎉</h1>
          <p>Hello ${user.name},</p>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Order Details</h3>
            <p><strong>Order Number:</strong> ${order.orderNumber}</p>
            <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Estimated Delivery:</strong> ${order.expectedDelivery ? 
              new Date(order.expectedDelivery).toLocaleString() : 'Soon'}</p>
          </div>
          
          <p>You can track your order in the app.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/orders/${order._id}" 
               style="background: #f97316; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 8px; display: inline-block;">
              Track Order
            </a>
          </div>
          
          <p>Thank you for choosing Delish!</p>
          <p><strong>The Delish Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', user.email);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

// Send password reset email
exports.sendPasswordReset = async (user, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Reset Your Delish Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f97316; text-align: center;">Password Reset</h1>
          <p>Hello ${user.name},</p>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #f97316; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 8px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p>If you didn't request this, please ignore this email.</p>
          <p><strong>The Delish Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', user.email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};