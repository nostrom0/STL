from flask import Flask, request, jsonify
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
import re

app = Flask(__name__)

load_dotenv()
API_KEY = os.getenv('API_KEY')

youtube = build('youtube', 'v3', developerKey=API_KEY)

def extract_channel_id(url):
    regex = r'(?:youtube\.com\/(?:channel\/|c\/)|youtu\.be\/|youtube\.com\/user\/[^\/]+\/)([a-zA-Z0-9_-]{24})'
    match = re.search(regex, url)
    return match.group(1) if match else None

@app.route('/get_data', methods=['POST'])
def get_data():
    data = request.json
    channel_url = data['channel_url']
    channel_id = extract_channel_id(channel_url)

    if not channel_id:
        return jsonify({'error': 'Invalid channel URL'}), 400

    request = youtube.channels().list(
        part='contentDetails',
        id=channel_id
    )
    response = request.execute()

    playlist_id = response['items'][0]['contentDetails']['relatedPlaylists']['uploads']

    request = youtube.playlistItems().list(
        part='snippet',
        playlistId=playlist_id,
        maxResults=50
    )
    response = request.execute()

    videos = []
    for item in response['items']:
        video_id = item['snippet']['resourceId']['videoId']
        video_title = item['snippet']['title']
        video_request = youtube.videos().list(
            part='statistics, snippet',
            id=video_id
        )
        video_response = video_request.execute()
        video_data = video_response['items'][0]
        views = int(video_data['statistics']['viewCount'])
        published_date = video_data['snippet']['publishedAt']

        videos.append({
            'title': video_title,
            'views': views,
            'published_date': published_date
        })

    return jsonify(videos)

if __name__ == '__main__':
    app.run(debug=True)
