import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IReactionJob } from '@reaction/interfaces/reaction.interface';
import { ReactionsCache } from '@service/redis/reactions.cache';
import { reactionQueue } from '@service/queues/reaction.queue';
import { Helpers } from '@global/helpers/helpers';

const reactionCache: ReactionsCache = new ReactionsCache();

export class Remove {
  public async reaction(req: Request, res: Response): Promise<void> {
    const { postId, previousReaction, postReactions } = req.params;
    await reactionCache.removePostReactionFromCache(postId, `${req.currentUser!.username}`, Helpers.parseJson(postReactions));
    const databaseReactionData: IReactionJob = {
      postId,
      username: req.currentUser!.username,
      previousReaction,
    };
    reactionQueue.addReactionJob('removeReactionFromDB', databaseReactionData);
    res.status(HTTP_STATUS.OK).json({ message: 'Reaction removed from post' });
  }
}
