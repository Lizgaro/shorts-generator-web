import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, mode, voice, background } = body;

    const sampleVideos: Record<string, string> = {
      pulp_fiction: 'https://assets.mixkit.co/videos/preview/mixkit-dramatic-dark-moody-city-at-night-41584-large.mp4',
      blade_runner: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-at-night-42898-large.mp4',
      spongebob: 'https://assets.mixkit.co/videos/preview/mixkit-fun-3d-character-dancing-in-studio-41489-large.mp4',
      spider_man: 'https://assets.mixkit.co/videos/preview/mixkit-rain-drops-falling-on-dark-window-41580-large.mp4'
    };

    const selectedBg = sampleVideos[background] || sampleVideos['pulp_fiction'];

    return NextResponse.json({
      success: true,
      message: 'Video rendering queued successfully',
      videoUrl: selectedBg,
      metadata: {
        topic: topic || 'Default viral quote',
        mode: mode || 'card_movie',
        voice: voice || 'ru-RU-DmitryNeural',
        durationSec: 15,
        resolution: '1080x1920'
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to queue rendering' }, { status: 500 });
  }
}
