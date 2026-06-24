import { cart } from "../../../src/lib/cart.js";

export function GET(_, res) {
  res.html(cart.length.toString());
}
