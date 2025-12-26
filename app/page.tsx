'use client'

import { useState } from 'react'
import { Calendar, Clock, TrendingUp, Image, BarChart3, Settings, Upload, Play } from 'lucide-react'

interface ScheduledPost {
  id: number
  caption: string
  scheduledTime: string
  image: string
  status: 'pending' | 'posted' | 'failed'
}

interface Analytics {
  followers: number
  engagement: number
  reach: number
  posts: number
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'analytics' | 'automation'>('schedule')
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: 1,
      caption: 'Beautiful sunset at the beach 🌅',
      scheduledTime: '2025-12-27 18:00',
      image: '🖼️',
      status: 'pending'
    },
    {
      id: 2,
      caption: 'Morning coffee vibes ☕',
      scheduledTime: '2025-12-28 09:00',
      image: '🖼️',
      status: 'pending'
    }
  ])

  const [analytics] = useState<Analytics>({
    followers: 12450,
    engagement: 8.5,
    reach: 45200,
    posts: 156
  })

  const [caption, setCaption] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
  const [autoLikeEnabled, setAutoLikeEnabled] = useState(false)
  const [autoFollowEnabled, setAutoFollowEnabled] = useState(false)

  const handleSchedulePost = () => {
    if (!caption || !scheduledTime) {
      alert('Please fill in all fields')
      return
    }

    const newPost: ScheduledPost = {
      id: scheduledPosts.length + 1,
      caption,
      scheduledTime,
      image: '🖼️',
      status: 'pending'
    }

    setScheduledPosts([...scheduledPosts, newPost])
    setCaption('')
    setScheduledTime('')
    alert('Post scheduled successfully!')
  }

  const handleDeletePost = (id: number) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-instagram-purple via-instagram-pink to-instagram-orange bg-clip-text text-transparent mb-2">
            Instagram Automation
          </h1>
          <p className="text-gray-600">Automate your Instagram workflow and grow your presence</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'schedule'
                ? 'bg-gradient-to-r from-instagram-purple to-instagram-pink text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <Calendar size={20} />
            Schedule Posts
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-instagram-purple to-instagram-pink text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <BarChart3 size={20} />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'automation'
                ? 'bg-gradient-to-r from-instagram-purple to-instagram-pink text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <Settings size={20} />
            Automation
          </button>
        </div>

        {/* Schedule Posts Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {/* Create Post Form */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Upload size={24} className="text-instagram-pink" />
                Schedule New Post
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-instagram-pink transition-colors cursor-pointer">
                    <Image size={48} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">Click to upload image</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Caption</label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none resize-none"
                    rows={4}
                    placeholder="Write your caption here..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Schedule Time</label>
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none"
                  />
                </div>
                <button
                  onClick={handleSchedulePost}
                  className="w-full bg-gradient-to-r from-instagram-purple to-instagram-pink text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Clock size={20} />
                  Schedule Post
                </button>
              </div>
            </div>

            {/* Scheduled Posts List */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Scheduled Posts ({scheduledPosts.length})</h2>
              <div className="space-y-4">
                {scheduledPosts.map(post => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <div className="text-5xl">{post.image}</div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">{post.caption}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {post.scheduledTime}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            post.status === 'posted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {scheduledPosts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No scheduled posts yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Followers</h3>
                  <TrendingUp className="text-instagram-purple" size={24} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.followers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-2">+12.5% this month</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Engagement Rate</h3>
                  <BarChart3 className="text-instagram-pink" size={24} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.engagement}%</p>
                <p className="text-sm text-green-600 mt-2">+2.1% this week</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Reach</h3>
                  <TrendingUp className="text-instagram-orange" size={24} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.reach.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-2">+18.3% this month</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 font-medium">Total Posts</h3>
                  <Image className="text-instagram-purple" size={24} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{analytics.posts}</p>
                <p className="text-sm text-gray-600 mt-2">Active account</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Engagement Over Time</h2>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 78, 85, 72, 90, 88, 95].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-instagram-purple to-instagram-pink rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-600">Day {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Posts */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Top Performing Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="text-6xl mb-3 text-center">🖼️</div>
                    <p className="text-sm text-gray-600 mb-2">Posted 3 days ago</p>
                    <div className="flex justify-between text-sm">
                      <span>❤️ {(2340 * i).toLocaleString()}</span>
                      <span>💬 {(156 * i)}</span>
                      <span>🔗 {(45 * i)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Automation Tab */}
        {activeTab === 'automation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Play size={24} className="text-instagram-pink" />
                Automation Settings
              </h2>
              <p className="text-gray-600 mb-6">Configure automated actions to grow your Instagram presence</p>

              <div className="space-y-6">
                {/* Auto Reply */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Auto Reply to Comments</h3>
                      <p className="text-sm text-gray-600">Automatically respond to comments on your posts</p>
                    </div>
                    <button
                      onClick={() => setAutoReplyEnabled(!autoReplyEnabled)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        autoReplyEnabled ? 'bg-gradient-to-r from-instagram-purple to-instagram-pink' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        autoReplyEnabled ? 'translate-x-6' : ''
                      }`} />
                    </button>
                  </div>
                  {autoReplyEnabled && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Reply Message</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none resize-none"
                        rows={3}
                        placeholder="Thank you for your comment! ❤️"
                      />
                    </div>
                  )}
                </div>

                {/* Auto Like */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Auto Like Posts</h3>
                      <p className="text-sm text-gray-600">Automatically like posts from specific hashtags or accounts</p>
                    </div>
                    <button
                      onClick={() => setAutoLikeEnabled(!autoLikeEnabled)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        autoLikeEnabled ? 'bg-gradient-to-r from-instagram-purple to-instagram-pink' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        autoLikeEnabled ? 'translate-x-6' : ''
                      }`} />
                    </button>
                  </div>
                  {autoLikeEnabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Target Hashtags</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none"
                          placeholder="#photography, #travel, #nature"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Daily Limit</label>
                        <input
                          type="number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none"
                          placeholder="100"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Auto Follow */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Auto Follow/Unfollow</h3>
                      <p className="text-sm text-gray-600">Automatically follow and unfollow users to grow your audience</p>
                    </div>
                    <button
                      onClick={() => setAutoFollowEnabled(!autoFollowEnabled)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        autoFollowEnabled ? 'bg-gradient-to-r from-instagram-purple to-instagram-pink' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        autoFollowEnabled ? 'translate-x-6' : ''
                      }`} />
                    </button>
                  </div>
                  {autoFollowEnabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Target Accounts</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none"
                          placeholder="@competitor1, @competitor2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Follow per day</label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none"
                            placeholder="50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Unfollow after (days)</label>
                          <input
                            type="number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-instagram-pink focus:border-transparent outline-none"
                            placeholder="7"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Note:</strong> Use automation features responsibly. Instagram has rate limits and may restrict accounts that use excessive automation.
                </p>
              </div>
            </div>

            {/* Automation Stats */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Automation Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Comments Replied</p>
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-sm text-green-600 mt-1">Today: 12</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Posts Liked</p>
                  <p className="text-2xl font-bold">1,834</p>
                  <p className="text-sm text-green-600 mt-1">Today: 89</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600 text-sm mb-1">Users Followed</p>
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-sm text-green-600 mt-1">Today: 23</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
