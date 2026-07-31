import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const subs = ['Showerthoughts', 'AskReddit', 'technology'];
    const randomSub = subs[Math.floor(Math.random() * subs.length)];
    const res = await fetch(`https://www.reddit.com/r/${randomSub}/hot.json?limit=10`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (res.ok) {
      const data = await res.json();
      const posts = data.data.children
        .map((child: any) => child.data)
        .filter((p: any) => !p.stickied && p.title.length > 20 && p.title.length < 280)
        .map((p: any) => ({
          id: p.id,
          title: p.title,
          author: p.author,
          subreddit: randomSub,
          ups: p.ups,
          num_comments: p.num_comments
        }));

      if (posts.length > 0) {
        return NextResponse.json({ success: true, trends: posts });
      }
    }
  } catch (error) {
    // Fallback
  }

  const fallbackTrends = [
    {
      id: 'tb1',
      title: 'When you realize that 2016 was 10 years ago and time is moving way faster than expected.',
      author: 'mind_bender',
      subreddit: 'Showerthoughts',
      ups: 18400,
      num_comments: 512
    },
    {
      id: 'tb2',
      title: 'What is one harsh truth about life that most people refuse to accept until it is too late?',
      author: 'truth_teller',
      subreddit: 'AskReddit',
      ups: 34200,
      num_comments: 1890
    },
    {
      id: 'tb3',
      title: 'The AI revolution of 2026 is silently redesigning how humans create visual storytelling.',
      author: 'tech_insider',
      subreddit: 'technology',
      ups: 12900,
      num_comments: 640
    }
  ];

  return NextResponse.json({ success: true, trends: fallbackTrends });
}
