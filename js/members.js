// ทำเนียบโรงเรียนสมาชิก — ค้นหา + กรองตามประเภท/อำเภอ (ปิด JS แล้วยังเห็นการ์ดครบ)
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('school-grid');
  if (!grid) return;
  var cards = [].slice.call(grid.querySelectorAll('.school'));
  var search = document.getElementById('s-search');
  var count = document.getElementById('s-count');
  var buttons = [].slice.call(document.querySelectorAll('.dir-filters .f'));
  var filter = 'all';

  function apply() {
    var q = (search && search.value || '').trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (c) {
      var okF = filter === 'all' ||
        (filter.indexOf('cat:') === 0 && c.dataset.cat === filter.slice(4)) ||
        (filter.indexOf('dis:') === 0 && c.dataset.district === filter.slice(4));
      var okQ = !q || (c.dataset.search || '').toLowerCase().indexOf(q) !== -1;
      var show = okF && okQ;
      c.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    if (count) count.textContent = shown;
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      buttons.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      filter = b.dataset.f;
      apply();
    });
  });
  if (search) search.addEventListener('input', apply);
});
