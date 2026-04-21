You may use any React-based web technologies.

1. Build your own video player from scratch (no third-party libraries or
   open source players).
2. Implement the design exactly as it is in Figma.
3. Your player must support HLS streaming and allow users to
   change video resolution (720p, 1080p, etc…). Hint: use hls.js.
4. Display chapters on the timeline as shown in the Figma design.
5. Timeline interaction:
   a. On hover, show current time and the name of the hovered
   chapter.
   b. Clicking on the timeline should seek to the selected time in
   the video.

Submission Guidelines:
- Share your solution via a public Github repository.
- Provide clear setup and run instructions.
- Feel free to explain key decisions or challenges you faced.

Test input:
{
"hlsPlaylistUrl":
"https://vz-50e60d70-540.b-cdn.net/b87ac5f4-2cf0-42d1-acc8-32a89d3c
71c7/playlist.m3u8"
,
"videoLength": 348, // seconds
"chapters": [
{ "title": "Introduction & Course Overview"
,
"start": 0,
"end": 14 },
{
"title": "Curiosity's Role in Critical & Creative Thinking"
,
"start": 15,
"end": 57
},
{
"title": "Analytical vs Creative Thinking Explained"
,
"start": 58,
"end": 116
},
{
"title": "Building Your Bank of Dots"
,
"start": 117,
"end": 138
},
{
"title": "Practical Strategies to Stay Curious"
,
"start": 139,
"end": 225
},
{ "title": "Benefits of Curiosity"
,
"start": 226,
{ "title": "Conclusion & Recap"
,
"start": 313,
"end": 312 },
"end": 348 }
]
}

