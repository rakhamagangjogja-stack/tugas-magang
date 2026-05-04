import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  defaultLandingContent,
  loadLandingContent,
  removeAuthToken,
  saveLandingContent,
  LandingContent,
} from '../lib/storage';

const AdminPanel = () => {
  const initialContent = loadLandingContent();
  const [heroLabel, setHeroLabel] = useState(initialContent.hero.label);
  const [heroTitle, setHeroTitle] = useState(initialContent.hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState(initialContent.hero.subtitle);
  const [ctaPrimary, setCtaPrimary] = useState(initialContent.hero.ctaPrimary);
  const [ctaPrimaryUrl, setCtaPrimaryUrl] = useState(initialContent.hero.ctaPrimaryUrl);
  const [ctaSecondary, setCtaSecondary] = useState(initialContent.hero.ctaSecondary);
  const [ctaSecondaryUrl, setCtaSecondaryUrl] = useState(initialContent.hero.ctaSecondaryUrl);
  const [heroImageLabel, setHeroImageLabel] = useState(initialContent.hero.imageLabel);
  const [sectionTitle, setSectionTitle] = useState(initialContent.section.title);
  const [sectionSubtitle, setSectionSubtitle] = useState(initialContent.section.subtitle);
  const [stats, setStats] = useState(initialContent.stats);
  const [problems, setProblems] = useState(initialContent.problems);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const content: LandingContent = useMemo(
    () => ({
      hero: {
        label: heroLabel,
        title: heroTitle,
        subtitle: heroSubtitle,
        ctaPrimary,
        ctaPrimaryUrl,
        ctaSecondary,
        ctaSecondaryUrl,
        imageLabel: heroImageLabel,
      },
      stats,
      section: {
        title: sectionTitle,
        subtitle: sectionSubtitle,
      },
      problems,
    }),
    [heroLabel, heroTitle, heroSubtitle, ctaPrimary, ctaPrimaryUrl, ctaSecondary, ctaSecondaryUrl, heroImageLabel, sectionTitle, sectionSubtitle, stats, problems],
  );

  const handleSave = () => {
    saveLandingContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    saveLandingContent(defaultLandingContent);
    setHeroLabel(defaultLandingContent.hero.label);
    setHeroTitle(defaultLandingContent.hero.title);
    setHeroSubtitle(defaultLandingContent.hero.subtitle);
    setCtaPrimary(defaultLandingContent.hero.ctaPrimary);
    setCtaPrimaryUrl(defaultLandingContent.hero.ctaPrimaryUrl);
    setCtaSecondary(defaultLandingContent.hero.ctaSecondary);
    setCtaSecondaryUrl(defaultLandingContent.hero.ctaSecondaryUrl);
    setHeroImageLabel(defaultLandingContent.hero.imageLabel);
    setSectionTitle(defaultLandingContent.section.title);
    setSectionSubtitle(defaultLandingContent.section.subtitle);
    setStats(defaultLandingContent.stats);
    setProblems(defaultLandingContent.problems);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate('/admin/login');
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    setStats((current) => current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
  };

  const addStat = () => setStats((current) => [...current, { label: 'Label baru', value: '0' }]);
  const removeStat = (index: number) => setStats((current) => current.filter((_, idx) => idx !== index));

  const updateProblem = (index: number, field: 'title' | 'description', value: string) => {
    setProblems((current) => current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
  };

  const addProblem = () => setProblems((current) => [...current, { title: 'Judul baru', description: 'Deskripsi baru' }]);
  const removeProblem = (index: number) => setProblems((current) => current.filter((_, idx) => idx !== index));

  return (
    <div className="page-shell">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div>
            <h2>Admin Panel</h2>
            <p>Edit semua konten landing page secara langsung.</p>
          </div>
          <div className="admin-actions">
            <Link className="button secondary" to="/">
              Lihat Landing Page
            </Link>
            <button className="button danger" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        <div className="edit-card">
          <h2>Pengaturan Konten</h2>
          <div className="edit-grid">
            <section className="edit-block">
              <h3>Hero Section</h3>
              <label>
                Label Hero
                <input value={heroLabel} onChange={(e) => setHeroLabel(e.target.value)} />
              </label>
              <label>
                Judul Hero
                <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
              </label>
              <label>
                Subjudul Hero
                <textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
              </label>
              <label>
                Teks Tombol Utama
                <input value={ctaPrimary} onChange={(e) => setCtaPrimary(e.target.value)} />
              </label>
              <label>
                URL Tombol Utama
                <input value={ctaPrimaryUrl} onChange={(e) => setCtaPrimaryUrl(e.target.value)} />
              </label>
              <label>
                Teks Tombol Sekunder
                <input value={ctaSecondary} onChange={(e) => setCtaSecondary(e.target.value)} />
              </label>
              <label>
                URL Tombol Sekunder
                <input value={ctaSecondaryUrl} onChange={(e) => setCtaSecondaryUrl(e.target.value)} />
              </label>
              <label>
                Label Gambar Hero
                <input value={heroImageLabel} onChange={(e) => setHeroImageLabel(e.target.value)} />
              </label>
            </section>

            <section className="edit-block">
              <h3>Statistik</h3>
              {stats.map((item, index) => (
                <div key={`${item.label}-${index}`} className="edit-block nested-block">
                  <label>
                    Label #{index + 1}
                    <input value={item.label} onChange={(e) => updateStat(index, 'label', e.target.value)} />
                  </label>
                  <label>
                    Nilai #{index + 1}
                    <input value={item.value} onChange={(e) => updateStat(index, 'value', e.target.value)} />
                  </label>
                  <button className="button danger small" type="button" onClick={() => removeStat(index)}>
                    Hapus Stat
                  </button>
                </div>
              ))}
              <button className="button secondary small" type="button" onClick={addStat}>
                Tambah Stat
              </button>
            </section>

            <section className="edit-block">
              <h3>Bagian Masalah</h3>
              <label>
                Judul Section
                <input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
              </label>
              <label>
                Subjudul Section
                <textarea value={sectionSubtitle} onChange={(e) => setSectionSubtitle(e.target.value)} />
              </label>
              {problems.map((item, index) => (
                <div key={`${item.title}-${index}`} className="edit-block nested-block">
                  <label>
                    Judul #{index + 1}
                    <input value={item.title} onChange={(e) => updateProblem(index, 'title', e.target.value)} />
                  </label>
                  <label>
                    Deskripsi #{index + 1}
                    <textarea value={item.description} onChange={(e) => updateProblem(index, 'description', e.target.value)} />
                  </label>
                  <button className="button danger small" type="button" onClick={() => removeProblem(index)}>
                    Hapus Masalah
                  </button>
                </div>
              ))}
              <button className="button secondary small" type="button" onClick={addProblem}>
                Tambah Masalah
              </button>
            </section>
          </div>

          <div className="admin-actions">
            <button className="button primary" type="button" onClick={handleSave}>
              Simpan Perubahan
            </button>
            <button className="button secondary" type="button" onClick={handleReset}>
              Reset ke Default
            </button>
            {saved && <div className="form-error">Perubahan berhasil disimpan!</div>}
          </div>

          <div className="preview-box">
            <h3>Preview singkat</h3>
            <div className="preview-card">
              <h2>{content.hero.title}</h2>
              <p>{content.hero.subtitle}</p>
              <div className="hero-actions" style={{ marginTop: 16 }}>
                <button className="button primary" type="button">
                  {content.hero.ctaPrimary}
                </button>
                <button className="button secondary" type="button">
                  {content.hero.ctaSecondary}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
