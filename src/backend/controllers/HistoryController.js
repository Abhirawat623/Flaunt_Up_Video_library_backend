import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";


export const getHistoryVideosHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    return new Response(200, {}, { history: user.history });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};



export const addVideoToHistoryHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { video } = JSON.parse(request.requestBody);
    //Was getting some weired error due to this code so commented it out for now
    // if (user.history.some((item) => item.id === video.id)) {
    //   return new Response(
    //     409,
    //     {},
    //     {
    //       errors: ["The video is already in your history"],
    //     }
    //   );
    // }
    user.history.push(video);
    return new Response(201, {}, { history: user.history });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing videos from user's history.
 * send DELETE Request at /api/user/history/:videoId
 * */

export const removeVideoFromHistoryHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const videoId = request.params.videoId;
    const filteredHistory = user.history.filter((item) => item._id !== videoId);
    this.db.users.update({ history: filteredHistory });
    return new Response(200, {}, { history: filteredHistory });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing videos from user's history.
 * send DELETE Request at /api/user/history/all
 * */

export const clearHistoryHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    this.db.users.update({ history: [] });
    return new Response(200, {}, { history: [] });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};