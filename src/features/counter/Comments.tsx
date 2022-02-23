import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedVideo } from "./videoSlice";

interface CommentsProps {
  apiKey: string;
}

type Comment = {
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

type CommentThread = {
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

type CommentListResponse = {
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
  const [comments, setComments] = useState<CommentThread[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  useEffect(() => {
    if (!video) return;
    console.log("trigger comment");
    fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${video.id.videoId}&key=${apiKey}
       `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data: CommentListResponse) => {
        console.log(data.items);
        setComments(data.items);
        setNextPageToken(data.nextPageToken);
      });
  }, [apiKey, video]);

  return (
    <div className="flex flex-col h-1/4">
      <div className="text-lg font-black border-b border-black w-1/2 mb-5">
        Comments
      </div>
      {comments.map((comment: CommentThread) => {
        return (
          <div key={comment.etag}>
            {comment.snippet.topLevelComment.snippet.textOriginal}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
