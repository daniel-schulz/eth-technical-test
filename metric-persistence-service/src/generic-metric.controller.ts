import {Body, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {GenericMetricService} from './generic-metric.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";

@Controller('generic-metrics')
@ApiTags('generic-metrics')
export class GenericMetricController {
  constructor(private readonly genericMetricService: GenericMetricService) {
  }

  @Get(":id")
  async getMetricData(@Param('id') id: string) {
    const metric = await this.genericMetricService.findOne(id);
    if (!metric) {
      throw new HttpException('Metric not found', HttpStatus.NOT_FOUND);
    }
    return metric;
  }

  @Post(":id")
  @ApiBody({})
  async setMetricData(@Param('id') id: string, @Body() createUserDto: any) {
    try {
      return await this.genericMetricService.create(id, createUserDto)
    } catch (error) {
      // TODO: Implement proper error handling
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
