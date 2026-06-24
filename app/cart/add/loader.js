import { cart } from "../../../src/lib/cart";

export async function POST(req, res) {
  cart.push(req.body.id);
  res.htmxTrigger("cart-updated");
  res.end();
}
