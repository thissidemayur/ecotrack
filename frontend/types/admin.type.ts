export interface IAdminSummary {
    globalAverage: number;
    totalUsers:number;
    topPerformers:Array<{
        userId:string;
        co2e: number;
        userInfo:{
            username:string | null;
            region: string
        }
    }>,
    bottomPerformers: Array<{
        userId:string;
        co2e: number;
        userInfo:{
            username:string | null;
            region: string
        }
    }>
}