const pool = require('../database/database');


async function getAllDiscounts() {
  const [rows] = await pool.query("SELECT * FROM discounts");
  return rows.map(discount => ({
    id: discount.id,
    description: discount.description, 
    percentage: discount.percentage
  }));
}





async function applyDiscount({ user_id, code, order_total }) {
  if (!user_id || !code || order_total == null) {
    throw new Error("user_id, code, and order_total are required");
  }

  const [rows] = await pool.query("SELECT * FROM discounts WHERE code = ?", [code]);

  if (rows.length === 0) {
    throw new Error("Invalid discount code");
  }

  const discount = rows[0];
  const now = new Date();
  const hour = now.getHours();

  let isValid = true;
  let reason = '';
  let finalPercentage = discount.percentage;


  switch (discount.code) {
    case 'WELCOME10':
    
      const [orders] = await pool.query("SELECT COUNT(*) as total FROM orders WHERE user_id = ?", [user_id]);
      if (orders[0].total > 0) {
        isValid = false;
        reason = "WELCOME10 is only valid on your first order.";
      }
      break;

    case 'LUNCH15':
    
      if (hour < 12 || hour >= 15) {
        isValid = false;
        reason = "LUNCH15 is only valid between 12 PM and 3 PM.";
      }
      break;

    case 'FREESHIP':
    
      if (order_total < 25) {
        isValid = false;
        reason = "FREESHIP is only valid on orders over $25.";
      }
      break;

    case 'SAVE5':
    
      break;

    default:
      reason = "Unknown discount logic";
      break;
  }

  if (!isValid) {
    throw new Error(reason);
  }

  const discountAmount = (finalPercentage / 100) * order_total;

  return {
    message: `Discount "${discount.code}" applied successfully.`,
    discount: {
      code: discount.code,
      percentage: finalPercentage,
      amount: discountAmount.toFixed(2),
    }
  };
}

module.exports = {
  getAllDiscounts,
  applyDiscount,
};
