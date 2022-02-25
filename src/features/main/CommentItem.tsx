import { useState } from "react";
import CommentReply from "./CommentReply";
import { Comment, CommentThread } from "./Comments";

interface CommentItemProps {
  comment: CommentThread;
}
const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      <div key={comment.etag} className="flex flex-col mb-4">
        <div className="flex flex-row">
          <div className="w-1/12">
            <img
              className="rounded-full flex-shrink-0"
              src={
                comment.snippet.topLevelComment.snippet.authorProfileImageUrl
              }
              alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
            />
          </div>
          <div className="flex w-11/12 flex-col">
            <div className="font-black">
              {comment.snippet.topLevelComment.snippet.authorDisplayName}
            </div>
            <div className="break-all">
              {comment.snippet.topLevelComment.snippet.textOriginal}
            </div>
            {comment.snippet.totalReplyCount > 0 && (
              <div
                className="hover:cursor-pointer"
                onClick={() => setShowReplies(!showReplies)}
              >
                <small className="text-sky-300">Show/Hide replies</small>
              </div>
            )}
          </div>
        </div>

        {showReplies &&
          comment.replies.comments.map((reply: Comment) => {
            return <CommentReply key={reply.etag} reply={reply} />;
          })}
      </div>
    </>
  );
};

export default CommentItem;
