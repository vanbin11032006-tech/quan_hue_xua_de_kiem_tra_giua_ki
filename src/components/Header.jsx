export default function Header({ tongPhan }) {
  const tenQuan = import.meta.env.VITE_TEN_QUAN || "Quán Huế Xưa";

  return (
    <header className="header">
      <div className="topbar">
        <a className="brand" href="#top" aria-label={tenQuan}>
          <span className="brand-mark">H</span>
          <span>{tenQuan}</span>
        </a>
        <nav aria-label="Điều hướng chính">
          <a href="#thuc-don">Thực đơn</a>
          <a href="#dat-mon">Đặt món</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
        <a className="cart-link" href="#gio-hang">
          Giỏ hàng <span data-testid="tong-phan">{tongPhan}</span>
        </a>
      </div>
      <div className="hero" id="top">
        <p className="eyebrow">HƯƠNG VỊ TINH TẾ · PHỤC VỤ TẬN TÂM</p>
        <h1>{tenQuan}</h1>
        <p className="hero-copy">Thưởng thức những món ăn được chuẩn bị bằng sự chăm chút và nguyên liệu tươi ngon mỗi ngày.</p>
        <a className="hero-button" href="#thuc-don">Xem thực đơn <span aria-hidden="true">↓</span></a>
      </div>
    </header>
  );
}