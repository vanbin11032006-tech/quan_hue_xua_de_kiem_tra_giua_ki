import { useState, useEffect } from 'react';
import Header from './components/Header';
import DanhSachMon from './components/DanhSachMon';
import GioHang from './components/GioHang';
import FormDatMon from './components/FormDatMon';
import Khung from './components/Khung';
import useLocalStorage from './hooks/useLocalStorage';
import { dsMon } from './data/dsMon';

export default function App() {
  const [gio, setGio] = useLocalStorage("gio-hang", []);
  const [idDangChon, setIdDangChon] = useState(null);
  const [thongBao, setThongBao] = useState('');
  const [formKey, setFormKey] = useState(0);

  const tenQuan = import.meta.env.VITE_TEN_QUAN || "Quán Huế Xưa";

  const tongPhan = gio.reduce((sum, item) => sum + item.soLuong, 0);

  useEffect(() => {
    if (tongPhan > 0) {
      document.title = `(${tongPhan}) ${tenQuan}`;
    } else {
      document.title = tenQuan;
    }
  }, [tongPhan, tenQuan]);

  const handleDatMon = (id) => {
    setGio((prevGio) => {
      const exist = prevGio.find((item) => item.id === id);
      if (exist) {
        return prevGio.map((item) =>
          item.id === id ? { ...item, soLuong: item.soLuong + 1 } : item
        );
      }
      return [...prevGio, { id, soLuong: 1 }];
    });
  };

  const handleChonMon = (id) => {
    setIdDangChon(id);
  };

  const handleXoaGio = () => {
    setGio([]);
  };

  const handleGuiDon = (thongTin) => {
    setThongBao(`Đã nhận đơn của ${thongTin.hoTen}`);
    setGio([]);
    setFormKey((prev) => prev + 1);
  };

  return (
    <div className="app">
      <Header tongPhan={tongPhan} />

      {thongBao && <p role="status">{thongBao}</p>}

      <main>
        <DanhSachMon
          dsMon={dsMon}
          idDangChon={idDangChon}
          onChon={handleChonMon}
          onDat={handleDatMon}
        />

        <Khung
          tieuDe="Giỏ hàng"
          hanhDong={<button onClick={handleXoaGio}>Xóa giỏ hàng</button>}
        >
          <GioHang gio={gio} dsMon={dsMon} />
        </Khung>

        <Khung tieuDe="Thông tin nhận món">
          <FormDatMon
            key={formKey}
            onGui={handleGuiDon}
            choPhepGui={gio.length > 0}
          />
        </Khung>
      </main>
    </div>
  );
}