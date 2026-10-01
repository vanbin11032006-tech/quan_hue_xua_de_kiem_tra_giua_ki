import { useState, useRef, useEffect } from 'react';

export default function FormDatMon({ onGui, choPhepGui }) {
  const [formData, setFormData] = useState({
    hoTen: '',
    soDienThoai: '',
    ghiChu: '',
  });
  const [errors, setErrors] = useState({});

  const hoTenRef = useRef(null);
  useEffect(() => {
    if (hoTenRef.current) {
      hoTenRef.current.focus();
    }
  }, []);

  const kiemTraValid = (data) => {
    const loi = {};
    const hoTenClean = data.hoTen.trim();
    if (!hoTenClean || hoTenClean.length < 2) {
      loi.hoTen = 'Họ tên cần ít nhất 2 ký tự';
    }
    const phoneClean = data.soDienThoai.trim();
    const phoneRegex = /^0\d{9}$/;
    if (!phoneClean || !phoneRegex.test(phoneClean)) {
      loi.soDienThoai = 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0';
    }
    return loi;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const validationErrors = kiemTraValid(formData);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = kiemTraValid(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onGui({
        hoTen: formData.hoTen.trim(),
        soDienThoai: formData.soDienThoai.trim(),
        ghiChu: formData.ghiChu.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-dat-mon">
      <div>
        <label htmlFor="hoTen">Họ tên</label>
        <input
          id="hoTen"
          name="hoTen"
          type="text"
          ref={hoTenRef}
          value={formData.hoTen}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.hoTen && <p className="loi" role="alert">{errors.hoTen}</p>}
      </div>

      <div>
        <label htmlFor="soDienThoai">Số điện thoại</label>
        <input
          id="soDienThoai"
          name="soDienThoai"
          type="text"
          value={formData.soDienThoai}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.soDienThoai && <p className="loi" role="alert">{errors.soDienThoai}</p>}
      </div>

      <div>
        <label htmlFor="ghiChu">Ghi chú</label>
        <textarea
          id="ghiChu"
          name="ghiChu"
          value={formData.ghiChu}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={!choPhepGui}>
        Gửi đơn
      </button>
    </form>
  );
}