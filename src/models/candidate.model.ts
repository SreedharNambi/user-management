import {Pool, QueryResult} from 'pg';
import {v4} from 'uuid'

export class CandidateModel{

    candidateId: string;

    name: string;

    email: string;

    phone: string;

    joiningDate: string;

    age: number;

    public static build(d:any):CandidateModel{
        let model = new CandidateModel();
        if(d.createdDate) d.candidateId = d.candidate_id;
        ['candidateId', 'name', 'email', 'phone', 'joiningDate','age'].map(key=> model[key] = d[key]!==undefined ? d[key] :model[key]);
        if(!model.candidateId) model.candidateId = v4(); 
        return model;
    }

    async save(pool:Pool){
        let rs;
        rs = await pool.query("SELECT * FROM candidate WHERE phone = $1",[this.phone]).catch((e)=>{console.log(e,'cms1')});
        if(rs.rows[0]){
            await pool.query("UPDATE candidate SET phone = $1, email = $2 WHERE candidateId = $3",[this.phone,this.email,rs.rows[0].candidateId,this.age]).catch((e)=>{console.log(e)});
        }
        else{
            let values:any =[this.candidateId,this.name,this.email,this.phone,this.age,this.joiningDate];
            console.log(values);
            await pool.query("INSERT INTO candidate(candidateId, name, email, phone,age, joiningDate) VALUES($1, $2, $3, $4, $5, $6)",values).catch(e=>{console.log(e)}); 
        }
    }

    public static async searchCandidate(pool:Pool,searchStr: string, sortBy?:string, order?:string){
        let data:CandidateModel[]=[];
        let orderBy:string = '';
        if(sortBy) orderBy = 'ORDERBY' + sortBy;
        if(sortBy && order) orderBy = 'ORDERBY '+sortBy + ' ' + order; 
        if(pool && searchStr.length > 0){
            let rs = await pool.query(`SELECT * FROM candidate WHERE email LIKE '%' || $2 || '%' OR phone LIKE '%' || $2 || '%'  $1`,[orderBy,searchStr]).catch(e=>console.log(e));
            if(rs && rs.rows.length){
                for(let row of rs.rows){
                    let candidate = CandidateModel.build(row);
                    if(candidate) data.push(candidate);
                }
            return data;
            }
        }
    }

    public static async getAll(pool:Pool, limit:number,offset:number){
        let data:CandidateModel[]=[];
        const rs = await pool.query("SELECT * FROM candidate LIMIT $1 OFFSET $2",[limit, offset]);
        if(rs && rs.rows.length){
            for(let row of rs.rows){
                let candidate = CandidateModel.build(row);
                if(candidate) data.push(candidate);
            }
        return data;

         }
    }
}