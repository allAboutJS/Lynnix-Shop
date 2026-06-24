import { cart } from "../../../src/lib/cart";

export function GET(_, res) {
  res.html(cart.length.toString());
}
