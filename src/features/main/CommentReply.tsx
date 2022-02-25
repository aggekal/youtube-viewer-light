import { Comment } from "./Comments";

interface CommentReplyProps {
  reply: Comment;
}
const CommentReply: React.FC<CommentReplyProps> = ({ reply }) => {
  return (
    <div className="ml-6 mb-2 flex flex-row">
      <div className="w-1/12">
        <img
          className="rounded-full flex-shrink-0"
          src={reply.snippet.authorProfileImageUrl}
          alt={reply.snippet.authorDisplayName}
        />
      </div>
      <div className="w-11/12">
        <div className="font-black">{reply.snippet.authorDisplayName}</div>
        <div className="break-all">{reply.snippet.textOriginal}</div>
      </div>
    </div>
  );
};

export default CommentReply;
