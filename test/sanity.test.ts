describe('toolchain', () => {
  it('adds numbers', () => {
    expect(2+3).toBe(5);              // ← เติมตรง ...
  });

  it('compares objects', () => {
    const obj = { id: 1, title: "test" };
    expect(obj).toEqual({ id: 1, title: "test" });                   // ← ลอง toBe ก่อน แล้วเปลี่ยนเป็น toEqual
  });
});
