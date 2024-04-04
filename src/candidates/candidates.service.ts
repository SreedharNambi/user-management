import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/database/postgres.service';
import {Pool} from 'pg';
import { CandidateModel } from 'src/models/candidate.model';

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

    async getCandidates(limit:number,offset:number){
        const rs = await CandidateModel.getAll(this.pool,limit,offset);
        return rs;

    }

    async searchCandidate(search: string, sortBy?:string, order?:string){
        const rs = await CandidateModel.searchCandidate(this.pool, search, sortBy, order);
        return rs;
    }

}
