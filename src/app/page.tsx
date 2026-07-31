'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Sparkles, RefreshCw, Film, Tv, Video, Download, Github, Share2, Flame, Layers, Volume2 } from 'lucide-react';

interface Trend {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  ups: number;
  num_comments: number;
}

export default function Home() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('When you realize that 2016 was 10 years ago and time is moving way faster than expected.');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('mind_bender');
  const [selectedSub, setSelectedSub] = useState<string>('Showerthoughts');
  const [selectedMode, setSelectedMode] = useState<string>('card_movie');
  const [selectedBg, setSelectedBg] = useState<string>('pulp_fiction');
  const [selectedVoice, setSelectedVoice] = useState<string>('ru-RU-DmitryNeural');
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeWordIdx, setActiveWordIdx] = useState<number>(0);

  const fetchTrends = async () => {
    try {
      const res = await fetch('/api/trends');
      const data = await res.json();
      if (data.success && data.trends.length > 0) {
        setTrends(data.trends);
        const top = data.trends[0];
        setSelectedTopic(top.title);
        setSelectedAuthor(top.author);
        setSelectedSub(top.subreddit);
      }
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const words = selectedTopic.split(' ');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % words.length);
    }, 450);
    return () => clearInterval(interval);
  }, [isPlaying, words.length]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          mode: selectedMode,
          voice: selectedVoice,
          background: selectedBg
        })
      });
      setTimeout(() => {
        setIsGenerating(false);
        setIsPlaying(true);
      }, 1500);
    } catch (e) {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <header className="border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                LIZGARO Shorts AI
              </h1>
              <p className="text-xs text-zinc-400">Auto Reels & Shorts Generator</p>
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
              <span>GitHub Repository</span>
            </a>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Vercel Live
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
                <h2 className="font-semibold text-zinc-100">1. Автопоиск Трендов (Reddit / Polymarket)</h2>
              </div>
              <button
                onClick={fetchTrends}
                className="flex items-center space-x-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Обновить тренды</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {trends.slice(0, 3).map((t) => (
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
                    <span>u/{t.author} • 🔥 {t.ups} upvotes</span>
                  </div>
                  <p className="text-sm font-medium leading-snug">{t.title}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Или введите собственный текст / цитату:</label>
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
              <h2 className="font-semibold text-zinc-100">2. Выбор Режима Генерации (Preset Mode)</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'card_movie', title: 'Твит / Пост + Кино', desc: 'Скруглённая плашка твита + нарезка сцен из фильмов', icon: Tv },
                { id: 'quote_cinematic', title: 'Философская Цитата', desc: 'Полноэкранный кинематографичный арт + белые титры', icon: Film },
                { id: 'ai_explainer', title: 'AI Story Explainer', desc: 'Динамичная смена кадров + акцентный караоке текст', icon: Video },
                { id: 'meme_edit', title: 'Мем / Поп-Культура', desc: 'Вирусные 3D мем-персонажи под музыку', icon: Sparkles }
              ].map((m) => {
                const IconComp = m.icon;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                      selectedMode === m.id
                        ? 'bg-indigo-950/40 border-indigo-500/60 text-white'
                        : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/60 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconComp className={`w-5 h-5 ${selectedMode === m.id ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      {selectedMode === m.id && <span className="h-2 w-2 rounded-full bg-indigo-400"></span>}
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
                <span>Фоновый Клип / Фильм:</span>
              </label>
              <select
                value={selectedBg}
                onChange={(e) => setSelectedBg(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="pulp_fiction">🎬 Pulp Fiction (Кофейная сцена)</option>
                <option value="blade_runner">🏙️ Blade Runner 2049 (Aesthetic Night)</option>
                <option value="spongebob">🧽 SpongeBob 3D Dance Loop</option>
                <option value="spider_man">🕷️ Spider-Man Rain Scene</option>
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
                <option value="ru-RU-DmitryNeural">🇷🇺 Русский — Дмитрий (Neural)</option>
                <option value="ru-RU-SvetlanaNeural">🇷🇺 Русский — Светлана (Neural)</option>
                <option value="en-US-ChristopherNeural">🇺🇸 English — Christopher (Deep Male)</option>
                <option value="en-US-JennyNeural">🇺🇸 English — Jenny (Natural Female)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/25 flex items-center justify-center space-x-2 transition transform active:scale-[0.99] disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Генерация видео 1080x1920...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Сгенерировать Короткое Видео (Short / Reel)</span>
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

            <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-zinc-900 flex flex-col justify-between p-4">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-b from-purple-900/40 via-zinc-900 to-black animate-pulse"></div>
              </div>

              {selectedMode === 'card_movie' && (
                <div className="relative z-10 mt-8 p-3.5 bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center text-[10px] font-bold text-white">
                      r/
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-none">r/{selectedSub}</p>
                      <p className="text-[10px] text-zinc-400">u/{selectedAuthor} • 4h ago</p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-100 font-medium leading-snug">{selectedTopic}</p>
                </div>
              )}

              <div className="relative z-10 mb-12 text-center px-2">
                <div className="inline-block bg-black/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <p className="text-sm font-extrabold tracking-wide uppercase text-white drop-shadow-md">
                    {words.map((w, idx) => (
                      <span
                        key={idx}
                        className={`inline-block mx-0.5 transition ${
                          idx === activeWordIdx ? 'text-amber-400 scale-110 font-black' : 'text-white'
                        }`}
                      >
                        {w}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white shadow-lg transition">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-4 text-center">Превью интерактивного 9:16 вертикального плеера</p>
        </div>
      </main>
    </div>
  );
}
