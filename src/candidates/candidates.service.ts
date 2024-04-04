import { BadRequestException, Injectable } from '@nestjs/common';
import { PostgresService } from 'src/database/postgres.service';
import {Pool} from 'pg';
import { CandidateModel } from 'src/models/candidate.model';
import { CandidateResponseDto } from './dto/candidate-response.dto';

@Injectable()
export class CandidatesService {
    pool:Pool

    constructor(private readonly postgresService:PostgresService){
        this.pool = postgresService.pool;
    }
    

    async createCandidate(data:any):Promise<string>{
        let candidate = CandidateModel.build(data);
        await candidate.save(this.pool);
        return 'Candidate created successfully';
    }

    async getCandidates(limit:number,offset:number):Promise<CandidateResponseDto>{
        const result = new CandidateResponseDto();
        const rs = await CandidateModel.getAll(this.pool,limit,offset);
        result.data = rs.data;
        result.offset = rs.offset;
        result.total = rs.total;
        return result;

    }

    async searchCandidate(search: string, sortBy?:string, order?:string):Promise<CandidateResponseDto>{
        const result = new CandidateResponseDto();
        const rs = await CandidateModel.searchCandidate(this.pool, search, sortBy, order);
        if(!rs.length) throw new BadRequestException('No candidate found');
        result.data = rs;
        return result;
    }

}
