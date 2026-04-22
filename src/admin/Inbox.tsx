import { useState } from 'react';
import { useData, type Message } from '../DataContext';
import { Mail, Trash2, CheckCheck, Search, Calendar, User, MessageSquare } from 'lucide-react';

const Inbox = () => {
  const { messages, deleteMessage, markMessageAsRead, markAllAsRead } = useData();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredMessages = messages
    .filter((msg) => {
      if (filter === 'unread') return !msg.read;
      if (filter === 'read') return msg.read;
      return true;
    })
    .filter((msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleSelectMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageAsRead(msg.id);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="text-[#8b6d4b]" size={24} />
          <h2 className="text-xl font-medium">Message Inbox</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <CheckCheck size={18} />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                filter === f
                  ? 'bg-[#8b6d4b] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
              {f === 'unread' && unreadCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 overflow-hidden max-h-[600px] overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail className="mx-auto mb-3 text-gray-300" size={48} />
              <p>No messages found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-[#8b6d4b]/5 border-l-4 border-l-[#8b6d4b]' : ''
                  } ${!msg.read ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                      <span className={`font-medium ${!msg.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {msg.name}
                      </span>
                    </div>
                    <button
                      onClick={(e) => handleDelete(msg.id, e)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{msg.email}</p>
                  <p className="text-sm text-gray-600 truncate mt-1">{msg.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(msg.date)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 min-h-[400px]">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-gray-200">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="text-[#8b6d4b]" size={20} />
                    <h3 className="text-xl font-medium">{selectedMessage.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail size={16} />
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-[#8b6d4b] hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={16} />
                  {formatDate(selectedMessage.date)}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="text-[#8b6d4b]" size={20} />
                  <h4 className="font-medium">Message</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Your message to Brown Girls Rituals`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#6d5639] transition-colors"
                >
                  <Mail size={18} />
                  Reply via Email
                </a>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Mail className="mb-4" size={64} />
              <p className="text-lg">Select a message to read</p>
              <p className="text-sm mt-2">Messages from your contact form will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-[#8b6d4b]">{messages.length}</p>
          <p className="text-gray-500 text-sm">Total Messages</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-blue-500">{unreadCount}</p>
          <p className="text-gray-500 text-sm">Unread</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-3xl font-bold text-green-500">{messages.filter(m => m.read).length}</p>
          <p className="text-gray-500 text-sm">Read</p>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
