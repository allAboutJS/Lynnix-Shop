import { cart } from "../../../src/lib/cart.js";

export async function POST(req, res) {
  cart.push(req.body.id);
  res.htmxTrigger("cart-updated");
  res.end();
}
