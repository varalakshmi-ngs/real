export const sendResponse = (
  res,
  statusCode,
  message,
  error = null,
  extra = {}
) => {
  const payload = { message };

  if (error) {
    payload.error = error.message || error;
  }

  if (extra) {
    if (typeof extra.toJSON === "function") {
      Object.assign(payload, extra.toJSON());
    } else {
      Object.assign(payload, extra);
    }
  }

  // console.log(payload);

  return res.status(statusCode).json(payload);
};

//  return sendResponse(res, 403, "User profile is still in progress.", null, {
//         mobile: user.mobile,
//         services,
//       });
