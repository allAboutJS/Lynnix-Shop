import { cart } from "../../../src/lib/cart";

export function DELETE(req, res) {
  const removeIdx = cart.indexOf(req.query.id);

  if (removeIdx === -1) {
    return;
  }

  cart.splice(removeIdx, 1);
  res.htmxTrigger("cart-updated");
}
