import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
export class CandidatesController {
    constructor(private readonly candidatesService:CandidatesService) {}

    @Post()
    async createCandidate(@Body() data:any):Promise<string>{
        return this.candidatesService.createCandidate(data);
    }

    @Get()
    async getCandidates(
        @Query('limit') limit?:number,
        @Query('offset') offset?:number
    ){
        return this.candidatesService.getCandidates(limit || 10, offset || 0);
    }

    @Get('search')
    async searchCandidates(
        @Query('search') search:string,
        @Query('sortBy') sortBy?:string,
        @Query('order') order?: string
        ){
        return await this.candidatesService.searchCandidate(search, sortBy, order);
    }

}
