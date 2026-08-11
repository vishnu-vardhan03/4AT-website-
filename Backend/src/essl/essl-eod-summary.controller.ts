import { Controller, Post, ServiceUnavailableException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EsslEodSummaryService } from './essl-eod-summary.service';

@Controller('admin/tickets/eod-summary')
@UseGuards(JwtAuthGuard)
export class EsslEodSummaryController {
  constructor(private readonly summaryService: EsslEodSummaryService) {}

  @Post('test')
  async sendTestSummary() {
    const result = await this.summaryService.sendEodSummary();
    if (!result.sent) throw new ServiceUnavailableException('EOD summary email could not be sent');
    return result;
  }
}
