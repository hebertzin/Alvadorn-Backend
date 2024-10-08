import { Activity } from "../../../domain/entities/activity-entity";
import { AppError } from "../../errors/errors";
import { HttpStatusCode } from "../../../domain/http-status";
import { IActivityRepository } from "../../../domain/repositories/activity-repository";
import { Logging } from "../../../domain/logging";

export interface ListActivity {
  invoke(
    user_id: string,
    page?: number,
    limit?: number,
  ): Promise<Activity[] | null>;
}

export class ListActivityUseCase implements ListActivity {
  constructor(
    readonly activityRepository: IActivityRepository,
    readonly logging: Logging,
  ) {}

  async invoke(
    user_id: string,
    page: number,
    limit: number,
  ): Promise<Activity[] | null> {
    try {
      return await this.activityRepository.findMany(user_id, page, limit);
    } catch (error) {
      this.logging.error(
        `Some error has occurred while trying to get a list of activities: ${error}`,
      );
      throw new AppError(
        "Internal server error",
        HttpStatusCode.InternalServerError,
      );
    }
  }
}
