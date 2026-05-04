import { loadLandingContent } from '../lib/storage';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const content = loadLandingContent();

  return (
    <div className="page-shell">
      <header className="hero-section">
        <div className="hero-copy">
          <h1>{content.hero.title}</h1>
          <p className="hero-subtitle">{content.hero.subtitle}</p>
          <div className="hero-actions">
            <a className="button primary" href={content.hero.ctaPrimaryUrl} target="_blank" rel="noreferrer">
              {content.hero.ctaPrimary}
            </a>
            <a className="button secondary" href={content.hero.ctaSecondaryUrl}>
              {content.hero.ctaSecondary}
            </a>
            <Link to="/admin/login" className="button admin-login">
              Login Admin
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-card">{content.hero.imageLabel}</div>
        </div>
      </header>

      <section className="stats-section">
        {content.stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`} className="stat-card">
            <span className="stat-value">{stat.value}</span>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="problems-section">
        <div className="section-heading">
          <div className="section-title">{content.section.title}</div>
          <p className="section-subtitle">{content.section.subtitle}</p>
        </div>
        <div className="problem-grid">
          {content.problems.map((item, index) => (
            <div className="problem-card" key={`${item.title}-${index}`}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
