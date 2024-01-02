export function ApiResponse(Success, Message, Error) {
  return {
    Success: Success,
    Message: Message,
    Error: Error,
  };
}
