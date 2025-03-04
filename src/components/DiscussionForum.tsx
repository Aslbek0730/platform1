import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: string;
  title: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  postId: string;
  text: string;
  upvotes: number;
  downvotes: number;
  replies: Comment[];
}

const DiscussionForum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Load posts from local storage on component mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('discussionPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to local storage whenever posts change
  useEffect(() => {
    localStorage.setItem('discussionPosts', JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };
    setPosts([...posts, newPost]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handleUpvotePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const handleDownvotePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post
      )
    );
  };

    const handleAddComment = (postId: string, commentText: string) => {
        const newComment: Comment = {
            id: Date.now().toString(),
            postId,
            text: commentText,
            upvotes: 0,
            downvotes: 0,
            replies: [],
        };

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, newComment] }
                    : post
            )
        );
    };

    const handleUpvoteComment = (postId: string, commentId: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map((comment) =>
                            comment.id === commentId
                                ? { ...comment, upvotes: comment.upvotes + 1 }
                                : comment
                        ),
                    }
                    : post
            )
        );
    };

    const handleDownvoteComment = (postId: string, commentId: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map((comment) =>
                            comment.id === commentId
                                ? { ...comment, downvotes: comment.downvotes + 1 }
                                : comment
                        ),
                    }
                    : post
            )
        );
    };

    const handleAddReply = (postId: string, commentId: string, replyText: string) => {
        const newReply: Comment = {
            id: Date.now().toString(),
            postId,
            text: replyText,
            upvotes: 0,
            downvotes: 0,
            replies: [],
        };

        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map((comment) =>
                            comment.id === commentId
                                ? { ...comment, replies: [...comment.replies, newReply] }
                                : comment
                        ),
                    }
                    : post
            )
        );
    };

    const renderComments = (comments: Comment[], postId: string) => {
        return (
            <ul className="ml-4">
                {comments.map((comment) => (
                    <li key={comment.id} className="border-l-2 pl-2 mt-2">
                        <p>{comment.text}</p>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => handleUpvoteComment(postId, comment.id)}>
                                Upvote ({comment.upvotes})
                            </button>
                            <button onClick={() => handleDownvoteComment(postId, comment.id)}>
                                Downvote ({comment.downvotes})
                            </button>
                            <AddCommentForm
                              postId={postId}
                              parentCommentId={comment.id}
                              onAddComment={(text) => handleAddReply(postId, comment.id, text)}
                            />
                        </div>
                        {comment.replies &amp;&amp; renderComments(comment.replies, postId)}
                    </li>
                ))}
            </ul>
        );
    };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Discussion Forum</h1>

      <!-- Create Post Form -->
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Create New Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Post Content"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Create Post
        </button>
      </div>

      <!-- Post List -->
      <div>
        <h2 className="text-lg font-semibold mb-2">Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <div className="flex items-center space-x-2 mt-2">
              <button onClick={() => handleUpvotePost(post.id)}>
                Upvote ({post.upvotes})
              </button>
              <button onClick={() => handleDownvotePost(post.id)}>
                Downvote ({post.downvotes})
              </button>
            </div>
            <div className="mt-4">
                <AddCommentForm postId={post.id} onAddComment={handleAddComment} />
                {renderComments(post.comments, post.id)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

    interface AddCommentFormProps {
        postId: string;
        parentCommentId?: string;
        onAddComment: (text: string) => void;
    }

    const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, parentCommentId, onAddComment }) => {
        const [commentText, setCommentText] = useState('');

        const handleAddComment = () => {
            if (commentText.trim() !== '') {
                onAddComment(commentText);
                setCommentText('');
            }
        };

        return (
            <div className="mt-2">
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder={parentCommentId ? "Reply to comment" : "Add a comment"}
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleAddComment}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-1"
                >
                    {parentCommentId ? "Reply" : "Comment"}
                </button>
            </div>
        );
    };

export default DiscussionForum;
