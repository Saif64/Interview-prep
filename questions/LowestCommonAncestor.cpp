#include<bits/stdc++.h>

#define     ll      long long
#define     pb      push_back
#define     eps     1e-9
#define     ff      first
#define     ss      second
#define     pi      acos(-1)
#define     Fast_Read                    ios_base::sync_with_stdio(false); cin.tie(nullptr);  cout.tie(nullptr);
#define     Precision(x)                 cout.setf(ios::fixed); cout.precision(x);

using namespace std;
typedef long double ld;
#ifdef ARnAb
     #define debug(...) __f(#__VA_ARGS__, __VA_ARGS__)
    template < typename Arg1 >
    void __f(const char* name, Arg1&& arg1){
        cerr << name << " is " << arg1 << std::endl;
    }
    template < typename Arg1, typename... Args>
    void __f(const char* names, Arg1&& arg1, Args&&... args){
        const char* comma = strchr(names+1, ',');
        cerr.write(names, comma - names) << " is " << arg1 <<"  ";
        __f(comma+1, args...);
    }
#else
    #define debug(...)
#endif
///******************************************START******************************************
int cs=0;
vector<int> adj[1005];
int dis[1005];
int spars_table[20][1005];

void dfs(int sp,int par)
{
    spars_table[0][sp]=par;
    dis[sp]=dis[par]+1;
    for(int i=0;i<adj[sp].size();i++)
    {
        if(adj[sp][i]==par)      continue;
        dfs(adj[sp][i],sp);
    }
}

void genSparsTable()
{
    for(int i=1;i<19;i++)
    {
        for(int j=1;j<1005;j++)
        {
            int x=spars_table[i-1][j];
            if(x!=-1)
            {
                spars_table[i][j]=spars_table[i-1][x];
            }
        }
    }
}
int levelUp(int a,int b)
{
    int dif=dis[b]-dis[a];
    while(dif>0)
    {
        int x=log2(dif);
        b=spars_table[x][b];
        dif-=(1<<x);
    }
    return b;
}
int LCA(int a,int b){
    if(a>b) swap(a,b);
    b=levelUp(a,b);
    if(a==b) return a;
    for(int i=18;i>=0;i--){
        int x=spars_table[i][a];
        int y=spars_table[i][b];
        if(x==y|| x==-1 || y==-1)
            continue;
        else a=x,b=y;
    }
    return spars_table[0][a];
}
void solve()
{
    for(int i=0;i<1005;i++)
    {
        adj[i].clear();
    }
    memset(spars_table,-1,sizeof spars_table);
    memset(dis,0,sizeof dis);
    int node;
    cin>>node;
    for(int i=1;i<=node;i++)
    {
        int n;
        cin>>n;
        for(int in, j=0;j<n;j++)
        {
            cin>>in;
            adj[i].pb(in);
            adj[in].pb(i);
        }
    }
    dfs(1,-1);
    genSparsTable();
    int q;
    cin>>q;
    cout<<"Case "<<++cs<<":"<<endl;
    while(q--)
    {
        int x,y;
        cin>>x>>y;
        cout<<LCA(x,y)<<endl;
    }
}
int main()
{
    Fast_Read
    Precision(2)
    #ifdef ARnAb
        double start_time = clock();
        ///freopen ("output.txt","w",stdout);
        ///freopen ("input.txt","r",stdin);
    #endif

    int tc=1;
    cin>>tc;
    while(tc--)
        solve();
    return 0;
}
