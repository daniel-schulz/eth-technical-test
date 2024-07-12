import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {GenericMetricService} from './generic-metric.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";

@Controller('generic-metrics')
@ApiTags('generic-metrics')
export class GenericMetricController {
  constructor(private readonly genericMetricService: GenericMetricService) {
  }

  @Get(":assessmentId/:userId")
  async getMetricData(
    @Param('assessmentId') assessmentId: string,
    @Param('userId') userId: string,
  ) {
    const metric = await this.genericMetricService.findOne(assessmentId, userId);
    if (!metric) {
      throw new HttpException('Metric not found', HttpStatus.NOT_FOUND);
    }
    return metric;
  }

  @Post(":assessmentId/:userId")
  @ApiBody({})
  async setMetricData(
    @Param('assessmentId') assessmentId: string,
    @Param('userId') userId: string,
    @Body() metric: any,
  ) {
    try {
      return await this.genericMetricService.create(assessmentId, userId, metric)
    } catch (error) {
      // TODO: Implement proper error handling
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
