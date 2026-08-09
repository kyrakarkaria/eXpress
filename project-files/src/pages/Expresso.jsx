import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

const monthOrderMap = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const magazineArchive = [
  {
    id: 'june-2026',
    title: 'eXpresso June 2026',
    month: 'June 2026',
    folderName: 'june',
    description: 'Fresh insights, current affairs highlights, campus events, and stories from our June 2026 collection.',
    tag: 'Latest Edition',
    available: true,
    pagesCount: 8,
    pagePrefix: 'eXpresso June_page'
  },
  {
    id: 'jul-2026',
    title: 'eXpresso July 2026',
    month: 'Jul 2026',
    folderName: 'jul',
    description: 'Fresh insights and stories from our July 2026 collection.',
    tag: 'Archived',
    available: true,
    pagesCount: 8,
    pagePrefix: 'eXpresso July_page'
  },
  {
    id: 'may-2026',
    title: 'eXpresso May 2026',
    month: 'May 2026',
    folderName: 'may', 
    description: "Fresh insights, current affairs highlights, campus events, and stories from our May 2026 collection.",
    tag: 'Archived',
    available: true,
    pagesCount: 8
  },
  {
    id: 'apr-2026',
    title: 'eXpresso Apr 2026',
    month: 'Apr 2026',
    folderName: 'apr',
    description: 'Fresh insights and stories from our Apr 2026 collection.',
    tag: 'Archived',
    available: true,
    pagesCount: 8,
    pagePrefix: 'eXpresso April_page'
  },
  {
    id: 'mar-2026',
    title: 'eXpresso Mar 2026',
    month: 'Mar 2026',
    folderName: 'mar',
    description: 'Fresh insights and stories from our Mar 2026 collection.',
    tag: 'Archived',
    available: true,
    pagesCount: 8,
    pagePrefix: 'eXpresso March_page'
  },
  {
    id: 'feb-2026',
    title: 'eXpresso Feb 2026',
    month: 'Feb 2026',
    folderName: 'feb',
    description: 'Fresh insights and stories from our Feb 2026 collection.',
    tag: 'Archived',
    available: true,
    pagesCount: 4,
    pagePrefix: 'eXpresso February 2026_page'
  }
];

const monthNameMap = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December'
};

const customElementStyle = {
  color: '#F5F3FF',
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '14px',
  padding: '14px 24px',
};

const getPagePrefix = (journal) => {
  if (journal.pagePrefix) return journal.pagePrefix;
  const monthShort = journal.month.split(' ')[0];
  const fullMonth = monthNameMap[monthShort] ?? monthShort;
  return `eXpresso ${fullMonth}_page`;
};

function RealReactFlipBook({ folderName, totalPages, pagePrefix }) {
  const bookRef = useRef(null);
  const [bookDimensions, setBookDimensions] = useState({ width: 450, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBookDimensions({ width: 320, height: 480 }); 
      } else if (width < 1024) {
        setBookDimensions({ width: 380, height: 560 });
      } else {
        setBookDimensions({ width: 450, height: 640 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pages = Array.from({ length: totalPages }, (_, i) => {
    const pageNumStr = String(i + 1).padStart(4, '0');
    const imagePrefix = pagePrefix || 'eXpresso May_page';
    return {
      pageNum: i + 1,
      imgUrl: `/expressoPages/${folderName}/${imagePrefix}-${pageNumStr}.jpg`
    };
  });

  useEffect(() => {
    const loadedImages = pages.map((page) => {
      const img = new Image();
      img.src = page.imgUrl;
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
      return img;
    });

    return () => {
      loadedImages.length = 0;
    };
  }, [folderName, totalPages, pagePrefix]);

  const handleNextPage = () => {
    window.requestAnimationFrame(() => {
      bookRef.current?.pageFlip()?.turnToNextPage();
    });
  };

  const handlePrevPage = () => {
    window.requestAnimationFrame(() => {
      bookRef.current?.pageFlip()?.turnToPrevPage();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden py-4 font-['Space_Grotesk']">
      <HTMLFlipBook
        ref={bookRef}
        width={bookDimensions.width}
        height={bookDimensions.height}
        size="fixed"
        minWidth={300}
        maxWidth={550}
        minHeight={400}
        maxHeight={700}
        drawShadow={true}
        showCover={true}
        maxShadowOpacity={0.3}
        usePortrait={true}
        mobileScrollSupport={true}
        className="shadow-2xl mx-auto components-flipbook"
        style={{ background: 'transparent' }}
      >
        {pages.map((page, index) => {
          const isCover = index === 0 || index === pages.length - 1;
          return (
            <div 
              key={page.pageNum} 
              className="relative w-full h-full bg-[#160b24] select-none overflow-hidden"
              data-density={isCover ? "hard" : "soft"}
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <img 
                src={page.imgUrl} 
                alt={`Page ${page.pageNum}`}
                className="w-full h-full object-contain pointer-events-none"
                loading="eager"
                decoding="sync"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const placeholder = e.target.nextSibling;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div 
                className="absolute inset-0 hidden flex-col items-center justify-center text-center p-6 bg-[#1f1235] border-2 border-purple-500/20"
                style={{ display: 'none' }}
              >
                <span className="text-xs uppercase tracking-widest text-purple-400 mb-2 font-['Space_Grotesk']">
                  {isCover ? 'Cover Page' : `Layout Page`}
                </span>
                <h3 className="text-xl font-bold text-white mb-4 font-['Space_Grotesk']">Page {page.pageNum}</h3>
                <div className="w-12 h-1 bg-purple-500 rounded-full opacity-40"></div>
              </div>
            </div>
          );
        })}
      </HTMLFlipBook>

      <div className="mt-8 flex items-center justify-center gap-4 w-full max-w-xs font-['Space_Grotesk']">
        <button
          onClick={handlePrevPage}
          style={customElementStyle}
          className="rounded-2xl border border-purple-900/60 bg-[#0c0618] hover:bg-purple-900/60 hover:border-purple-500/80 hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] font-semibold shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          ← Prev
        </button>
        <button
          onClick={handleNextPage}
          style={customElementStyle}
          className="rounded-2xl border border-purple-900/60 bg-[#0c0618] hover:bg-purple-900/60 hover:border-purple-500/80 hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] font-semibold shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function Expresso() {
  const [selectedMag, setSelectedMag] = useState(null);
  const [sortedArchive, setSortedArchive] = useState([]);

  const handleSelectMagazine = (journal) => {
    setSelectedMag(journal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArchive = () => {
    setSelectedMag(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const sorted = [...magazineArchive].sort((a, b) => {
      const [aMonthStr, aYearStr] = a.month.split(' ');
      const [bMonthStr, bYearStr] = b.month.split(' ');

      const aYear = parseInt(aYearStr, 10);
      const bYear = parseInt(bYearStr, 10);

      if (aYear !== bYear) {
        return bYear - aYear;
      }

      const aMonthIdx = monthOrderMap[aMonthStr.substring(0, 3)] ?? 0;
      const bMonthIdx = monthOrderMap[bMonthStr.substring(0, 3)] ?? 0;

      return bMonthIdx - aMonthIdx;
    });

    const formattedWithVolume = sorted.map((item, idx) => ({
      ...item,
      volume: `VOLUME ${romanNumerals[idx] || (idx + 1)}`,
      tag: idx === 0 ? 'Latest Edition' : 'Archived'
    }));

    setSortedArchive(formattedWithVolume);
  }, []);

  useEffect(() => {
    if (selectedMag) return; 
    
    const cards = document.querySelectorAll('.reveal-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.05 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [selectedMag, sortedArchive]);

  if (selectedMag) {
    return (
      <div className="min-h-screen bg-transparent text-slate-100 px-4 sm:px-6 py-6 flex flex-col items-center justify-start relative font-['Space_Grotesk']">
        <div className="w-full max-w-6xl mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <span className="text-purple-400 font-semibold text-xs tracking-wider block mb-1">
              {selectedMag.volume} • {selectedMag.tag}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-white">{selectedMag.title}</h1>
          </div>
          <button 
            onClick={handleBackToArchive}
            style={customElementStyle}
            className="w-full sm:w-auto border border-purple-900/60 rounded-2xl bg-[#0c0618] hover:bg-purple-900/60 hover:border-purple-500/80 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            ← Back to Archive
          </button>
        </div>

        <div className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden border border-purple-500/10 shadow-2xl p-2 sm:p-4 flex items-center justify-center min-h-[500px]">
          {selectedMag.available ? (
            <RealReactFlipBook 
              folderName={selectedMag.folderName} 
              totalPages={selectedMag.pagesCount || 8}
              pagePrefix={selectedMag.pagePrefix}
            />
          ) : (
            <div className="text-slate-400 italic text-base tracking-wide flex flex-col items-center gap-2 py-20 text-center">
              This volume is locked or undergoing scheduled maintenance.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden px-4 pb-16 pt-8 text-slate-200 sm:px-6 lg:px-8 font-['Space_Grotesk']">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <section className="relative mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center py-6 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <div 
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-1"
                style={{ color: '#F0ABFC' }}
              >
                <span className="w-4 h-[1px] inline-block" style={{ backgroundColor: '#F0ABFC' }}></span>
                The Literary Club Publication
              </div>
              
              <h1 
                className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Where expression, <br className="hidden sm:inline" />
                <span className="italic font-normal" style={{ color: '#F0ABFC' }}>becomes</span> presence.
              </h1>

              <p className="mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-light">
                Our literary magazine featuring articles, stories, poems, and insights about public speaking, debating, and communication skills.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#journals"
                style={{
                  ...customElementStyle,
                  color: '#020617'
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 font-bold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(192,132,252,0.6)] shadow-lg"
              >
                Explore journals
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-xl mx-auto">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Committee spirit</p>
                  <h2 
                    className="mt-1 text-2xl font-bold text-white"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    The art of expression
                  </h2>
                </div>
                <div 
                  style={customElementStyle}
                  className="shrink-0 rounded-2xl border border-purple-900/60 bg-[#0c0618] font-semibold transition-all duration-300 hover:border-purple-500/50"
                >
                  #eXpressToInspire💜
                </div>
              </div>

              <div className="mt-6 grid gap-3 grid-cols-3">
                {[
                  [`${magazineArchive.length}+`, 'Editions'],
                  ['10+', 'Contributors'],
                  ['∞', 'Ideas Shared'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 text-center transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-900/70">
                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">{value}</p>
                    <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400 font-medium">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-purple-500/10 bg-slate-950/80 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">From the Editors</p>
                <p className="mt-2.5 text-sm sm:text-base font-normal leading-relaxed text-slate-300">
                  Every edition of Expresso brings together current affairs, festival specials, campus events, thought-provoking articles, fun sections, and a unique annual theme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="journals" className="mx-auto max-w-7xl px-0 pb-16 pt-12 scroll-mt-12">
        <div className="mb-10 text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">Featured journals</p>
          <h2 className="mt-1 text-3xl font-bold text-white tracking-tight sm:text-4xl">Collections from the committee archive</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedArchive.map((journal, index) => {
            const cleanCardMonth = journal.month.split(' ')[0];
            return (
              <div
                key={journal.id}
                className="reveal-card rounded-2xl border p-5 shadow-lg flex flex-col justify-between transition-all duration-500 ease-out hover:border-purple-500/30 hover:shadow-[0_10px_30px_rgba(147,51,234,0.15)]"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transitionDelay: `${index * 40}ms`,
                  backgroundColor: journal.available ? 'rgba(9, 4, 22, 0.6)' : 'rgba(9, 4, 22, 0.2)',
                  borderColor: journal.available ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)'
                }}
              >
                <div>
                  <div 
                    onClick={() => journal.available && handleSelectMagazine(journal)}
                    className={`mb-4 aspect-[4/3] rounded-xl border border-white/10 bg-[#160b24] overflow-hidden relative group transition-all duration-300 ${
                      journal.available ? 'cursor-pointer hover:border-purple-500/50' : 'cursor-not-allowed'
                    }`}
                  >
                    <img 
                      src={`/expressoPages/${journal.folderName}/${getPagePrefix(journal)}-0001.jpg`}
                      alt={`${journal.title} preview cover`}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 text-[10px] tracking-wider text-purple-300 border border-purple-500/20 uppercase backdrop-blur-sm">
                      {index === 0 ? "★ Current Issue" : journal.volume}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-2.5">
                      <div className="text-lg font-black text-purple-500/60 mt-0.5">{String(index + 1).padStart(2, '0')}</div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{journal.title}</h3>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light line-clamp-2">{journal.description}</p>
                      </div>
                    </div>
                    <div 
                      style={customElementStyle}
                      className="shrink-0 rounded-2xl border border-purple-900/60 bg-[#0c0618] font-semibold"
                    >
                      {cleanCardMonth}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5 gap-3">
                  <button
                    type="button"
                    onClick={() => journal.available && handleSelectMagazine(journal)}
                    style={{
                      ...customElementStyle,
                      color: journal.available ? '#020617' : '#52525b'
                    }}
                    className={`w-full rounded-2xl font-bold inline-flex items-center justify-center gap-2 transition-all duration-300 ${
                      journal.available 
                        ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(192,132,252,0.5)] cursor-pointer shadow-md' 
                        : 'border border-white/5 bg-zinc-900/50 cursor-not-allowed'
                    }`}
                  >
                    {journal.available ? (
                      <>Read 3D Issue</>
                    ) : (
                      'Locked'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}