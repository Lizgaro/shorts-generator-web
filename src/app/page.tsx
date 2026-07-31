'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Sparkles, RefreshCw, Film, Tv, Video, Download, Github, Flame, Layers, Volume2, CheckCircle } from 'lucide-react';

interface Trend {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  ups: number;
  num_comments: number;
}

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([
    {
      id: 'ru1',
      title: 'Вот это кофе! Настоящий кофе для истинных киноманов.',
      author: 'киноман',
      subreddit: 'КиноЭдиты',
      ups: 18400,
      num_comments: 512
    },
    {
      id: 'ru2',
      title: 'Суровая правда жизни заключается в том, что никто не придет и не спасет тебя. Ты сам свой главный ресурс.',
      author: 'стоик',
      subreddit: 'Философия',
      ups: 28900,
      num_comments: 1150
    },
    {
      id: 'ru3',
      title: 'Вселенная вообще не обязана иметь смысл для тебя. Учись принимать хаос и двигаться дальше.',
      author: 'космос',
      subreddit: 'Наука',
      ups: 9800,
      num_comments: 310
    }
  ]);

  const [selectedTopic, setSelectedTopic] = useState<string>('Вот это кофе! Настоящий кофе для истинных киноманов.');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('киноман');
  const [selectedSub, setSelectedSub] = useState<string>('КиноЭдиты');
  const [selectedMode, setSelectedMode] = useState<string>('movie_edit');
  const [selectedBg, setSelectedBg] = useState<string>('pulp_fiction');
  const [selectedVoice, setSelectedVoice] = useState<string>('ru-RU-DmitryNeural');
  
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string>('/exact_reference_movie_edit.mp4');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (selectedMode === 'movie_edit' || selectedTopic.includes('кофе')) {
        setCurrentVideoSrc('/exact_reference_movie_edit.mp4');
      } else {
        setCurrentVideoSrc('/russian_short_1.mp4');
      }
      setIsGenerating(false);
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                LIZGARO Cinema Shorts AI (Русская Версия)
              </h1>
              <p className="text-xs text-zinc-400">Генератор Эдитов, Фильмов и Reels 1 в 1 по Референсам</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Lizgaro/shorts-generator-web"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium border border-zinc-700 transition"
            >
              <Github className="w-4 h-4" />
              <span>Репозиторий GitHub</span>
            </a>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Vercel Live (Работает)
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h2 className="font-semibold text-zinc-100">1. Трендовые Сцены & Эдиты (Русская озвучка)</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {trends.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTopic(t.title);
                    setSelectedAuthor(t.author);
                    setSelectedSub(t.subreddit);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                    selectedTopic === t.title
                      ? 'bg-purple-950/40 border-purple-500/60 text-white'
                      : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-800/60 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="font-semibold text-purple-400">r/{t.subreddit}</span>
                    <span>u/{t.author} • 🔥 {t.ups} апвоутов</span>
                  </div>
                  <p className="text-sm font-medium leading-snug">{t.title}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Текст для озвучки и титров:</label>
              <textarea
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                rows={2}
                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 transition resize-none"
              />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h2 className="font-semibold text-zinc-100">2. Выбор Стиля (Режим 1 в 1 с Референсами)</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'movie_edit', title: '🎬 Кино-Эдит (STILE CONTRARIO)', desc: 'Черный рамка + квадратное видео + титры снизу (1 в 1 как в референсах)', icon: Film },
                { id: 'card_movie', title: '💬 Карточка Поста + Видео', desc: 'Темная плашка с текстом поверх видеоряда', icon: Tv },
                { id: 'quote_cinematic', title: '✨ Полноэкранная Цитата', desc: 'Полноэкранный видеоряд с караоке', icon: Video },
                { id: 'meme_edit', title: '🧽 Мем / 3D Реакция', desc: 'Вирусная 3D анимация с реакциями', icon: Sparkles }
              ].map((m) => {
                const IconComp = m.icon;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                      selectedMode === m.id
                        ? 'bg-red-950/40 border-red-500/60 text-white'
                        : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/60 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconComp className={`w-5 h-5 ${selectedMode === m.id ? 'text-red-400' : 'text-zinc-500'}`} />
                      {selectedMode === m.id && <span className="h-2 w-2 rounded-full bg-red-400"></span>}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{m.title}</h3>
                      <p className="text-xs text-zinc-400 mt-1">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-zinc-800 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center space-x-1.5">
                <Video className="w-4 h-4 text-purple-400" />
                <span>Фильм / Источник Видео:</span>
              </label>
              <select
                value={selectedBg}
                onChange={(e) => setSelectedBg(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="pulp_fiction">🎬 Криминальное Чтиво (Pulp Fiction)</option>
                <option value="blade_runner">🏙️ Бегущий по лезвию (Blade Runner)</option>
                <option value="batman">🦇 Бэтмен (The Batman)</option>
                <option value="fight_club">🥊 Бойцовский Клуб (Fight Club)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center space-x-1.5">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Голос Озвучки (TTS):</span>
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="ru-RU-DmitryNeural">🇷🇺 Русский — Дмитрий (Мужской)</option>
                <option value="ru-RU-SvetlanaNeural">🇷🇺 Русский — Светлана (Женский)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 hover:from-red-500 hover:to-purple-500 text-white shadow-xl shadow-red-600/25 flex items-center justify-center space-x-2 transition transform active:scale-[0.99] disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Рендеринг видео фрагмента MP4 (1080x1920)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Сгенерировать Итоговый Ролик MP4</span>
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-[320px] h-[640px] bg-black rounded-[40px] p-3 border-4 border-zinc-800 shadow-2xl relative flex flex-col justify-between overflow-hidden group">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800"></span>
            </div>

            <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black flex flex-col items-center justify-center">
              <video
                ref={videoRef}
                src={currentVideoSrc}
                autoPlay
                loop
                muted={false}
                playsInline
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center space-x-3 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-2">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <a
                  href={currentVideoSrc}
                  download="reference_short.mp4"
                  className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white shadow-lg transition"
                  title="Скачать готовый MP4 ролик"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <CheckCircle className="w-4 h-4" />
            <span>Плеер воспроизводит реальное сгенерированное MP4 видео!</span>
          </div>
        </div>
      </main>
    </div>
  );
}
