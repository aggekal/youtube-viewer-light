import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../utils/Spinner";
import CommentItem from "./CommentItem";
import {
  selectComments,
  selectPageToken,
  selectSelectedVideo,
  updateComments,
  updateNextPageToken,
} from "./videoSlice";

interface CommentsProps {
  apiKey: string;
}

export type Comment = {
  kind: "youtube#comment";
  etag: string;
  id: string;
  snippet: {
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelId: {
      value: string;
    };
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    parentId: string;
    likeCount: number;
    publishedAt: Date;
  };
};

export type CommentThread = {
  kind: "youtube#commentThread";
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    topLevelComment: Comment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
  replies: {
    comments: Comment[];
  };
};

export type CommentListResponse = {
  kind: "youtube#commentThreadListResponse";
  etag: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: CommentThread[];
};

const Comments: React.FC<CommentsProps> = ({ apiKey }) => {
  const video = useAppSelector(selectSelectedVideo);
  const nextPageToken = useAppSelector(selectPageToken);
  const comments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setError(false);
    setHasMore(true);
    if (!video) return;
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&pageToken=${nextPageToken}&maxResults=20&videoId=${video.id.videoId}&key=${apiKey}
       `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (
          response.status === 400 ||
          response.status === 403 ||
          response.status === 404
        )
          setError(true);
        return response.json();
      })
      .then((data: CommentListResponse) => {
        console.log(data.items);
        if (data.items !== undefined)
          dispatch(updateComments([...comments, ...data.items]));
        setLoading(false);
        if (data.nextPageToken === undefined) {
          dispatch(updateNextPageToken(""));
          setHasMore(false);
        } else dispatch(updateNextPageToken(data.nextPageToken));
      })
      .catch((error) => console.log("Error", error));
  }, [video, loadMore]);

  return (
    <div className="flex flex-col h-1/4">
      <div className="text-lg font-black border-b border-gray-300 mb-5">
        {comments.length} Comments
      </div>
      {comments ? (
        comments.map((comment: CommentThread) => {
          return <CommentItem key={comment.etag} comment={comment} />;
        })
      ) : (
        <div>No comments or comments disabled </div>
      )}
      {error && <div>Something went wrong</div>}
      {loading && <Spinner />}
      {hasMore && (
        <button
          className="text-blue-400"
          onClick={() => setLoadMore(!loadMore)}
        >
          Show more comments
        </button>
      )}
    </div>
  );
};

export default Comments;
