import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { CandidateResponseDto } from './dto/candidate-response.dto';

@Controller('candidates')
export class CandidatesController {
    constructor(private readonly candidatesService:CandidatesService) {}

    @Post()
    async createCandidate(@Body() data:CreateCandidateDto):Promise<string>{
        return this.candidatesService.createCandidate(data);
    }

    @Get()
    async getCandidates(
        @Query('limit') limit?:number,
        @Query('offset') offset?:number
    ):Promise<CandidateResponseDto>{
        return this.candidatesService.getCandidates(limit || 10, offset || 0);
    }

    @Get('search')
    async searchCandidates(
        @Query('search') search:string,
        @Query('sortBy') sortBy?:string,
        @Query('order') order?: string
        ):Promise<CandidateResponseDto>{
        return await this.candidatesService.searchCandidate(search, sortBy, order);
    }

}
