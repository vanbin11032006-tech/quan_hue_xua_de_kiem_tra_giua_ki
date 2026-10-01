import { dinhDangGia } from '../utils/format';

export default function MonAnCard({ mon, dangChon, onChon, onDat }) {
  const { id, ten, gia, moTa, daHet, hinhAnh } = mon;

  const handleCardClick = () => {
    onChon(id);
  };

  const handleDatClick = (e) => {
    e.stopPropagation(); // C2.4: Chặn sự kiện nổi bọt
    if (!daHet) {
      onDat(id);
    }
  };

  return (
    <article 
      className={`mon-an-card ${dangChon ? 'dang-chon' : ''}`} 
      onClick={handleCardClick}
    >
      <img className="mon-an-anh" src={hinhAnh} alt={ten} loading="lazy" />
      <div className="mon-an-noi-dung">
      <h3>{ten}</h3>
      <p className="mo-ta">{moTa}</p>
      <div className="gia">{dinhDangGia(gia)}</div>
      
      {daHet && <span className="het-mon">Hết món</span>}

      <button disabled={daHet} onClick={handleDatClick}>
        Đặt món
      </button>
      </div>
    </article>
  );
}