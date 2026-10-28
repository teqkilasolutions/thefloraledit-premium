import { ArrowRight, ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { usePresentation } from '../../context/PresentationContext';

import { money } from '../../data/studio';
import { StudioDialog } from './StudioDialog';
import { StudioForm } from './StudioForm';

function ProductView() {
  const { quickViewProduct: product, closeQuickView, addToCart, openEnquiry } = usePresentation();
  if (!product) return null;
  return <StudioDialog title="A closer look" onClose={closeQuickView} wide><div className="product-detail"><img src={product.image} alt={product.name} width="700" height="700" /><div className="product-detail-copy"><span className="eyebrow">The vessel collection</span><h3>{product.name}</h3><p className="product-subtitle">{product.subtitle}</p><p className="product-price">{money(product.price)}</p><p>{product.description}</p><dl><div><dt>Dimensions</dt><dd>{product.dimensions}</dd></div><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Availability</dt><dd>Confirmed with your order request</dd></div></dl><button className="studio-button" onClick={() => { closeQuickView(); addToCart(product); }}>Add to bag <Plus size={17} /></button><button className="text-button" onClick={() => { closeQuickView(); openEnquiry(`Floral styling with the ${product.name}`); }}>Pair it with flowers <ArrowUpRight size={16} /></button><p className="form-note">Illustrative collection photography. Natural glaze and finish may vary.</p></div></div></StudioDialog>;
}

function Bag() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, openEnquiry } = usePresentation();
  if (!isCartOpen) return null;
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <StudioDialog title={`Your bag (${count})`} onClose={() => setIsCartOpen(false)} drawer><div className="bag-content">{count === 0 ? <div className="bag-empty"><ShoppingBag size={40} strokeWidth={1} /><h3>A little room for something lovely.</h3><p>Your bag is empty. Discover a piece that feels like you.</p><button className="studio-button" onClick={() => { setIsCartOpen(false); document.getElementById('collections')?.scrollIntoView(); }}>Explore the collection <ArrowRight size={17} /></button></div> : <><p className="bag-intro">Beautiful objects, thoughtfully chosen.</p><ul className="bag-items">{cartItems.map(({ product, quantity }) => <li key={product.id}><img src={product.image} alt={product.name} width="100" height="115" /><div className="bag-item-copy"><div><h3>{product.name}</h3><p>{product.subtitle}</p></div><div className="bag-item-bottom"><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={14} /></button><span aria-live="polite" aria-label={`${product.name} quantity`}>{quantity}</span><button disabled={quantity >= 99} aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={14} /></button></div><span>{money(product.price * quantity)}</span></div></div><button className="icon-button remove-button" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={16} /></button></li>)}</ul><div className="bag-summary"><div><span>Estimated subtotal</span><strong>{money(total)}</strong></div><p>Delivery, availability and final pricing are confirmed by the studio. No payment is taken here.</p><button className="studio-button" onClick={() => { setIsCartOpen(false); openEnquiry(`Vessel order: ${cartItems.map(i => `${i.quantity} × ${i.product.name}`).join(', ')}. Estimated subtotal ${money(total)}.`); }}>Prepare an order enquiry <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => setIsCartOpen(false)}>Continue exploring <ArrowRight size={15} /></button></div></>}</div></StudioDialog>;
}

export function StudioOverlays() {
  const { isEnquiryModalOpen, enquiryService, closeEnquiry } = usePresentation();
  return <><ProductView /><Bag />{isEnquiryModalOpen && <StudioDialog title="Let’s talk flowers" onClose={closeEnquiry}><div className="enquiry-dialog-intro"><span className="eyebrow">A thought is all it takes</span><p>Tell us a little about what you’re imagining.</p></div><StudioForm key={enquiryService} service={enquiryService} /></StudioDialog>}</>;
}


