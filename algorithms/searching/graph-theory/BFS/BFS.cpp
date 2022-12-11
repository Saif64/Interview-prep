#include<bits/stdc++.h>

#define     ll      long long
#define     pb      push_back
#define     eps     1e-9
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
int node,edge;
bool adj[1000][1000];
int color[1000];
int parent[1000];
int dis[1000];

void bfs(int sn)
{
    for(int i=0;i<node;i++)
    {
        color[i]=1;
        parent[i]=-1;
        dis[i]= INT_MIN ;
    }
    dis[sn]=0;
    deque<int>dq;
    dq.push_back(sn);
    while(!dq.empty())
    {
        int x;
        x=dq.front();
        dq.pop_front();
        color[x]=2;
        for(int i=0;i<node;i++)
        {
            if(adj[x][i]==1)
            {
                if(color[i]==1)
                {
                    parent[i]=x;
                    dq.push_back(i);
                    dis[i]=dis[x]+1;
                }
            }
        }
        color[x]=3;
    }
}

void solve()
{
    cin>>node>>edge;
    for(int i=0;i<edge;i++)
    {
        int a,b;
        cin>>a>>b;
        adj[a][b]=1;
        adj[a][b]=1;
    }
    bfs(0);
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
    //cin>>tc;
    while(tc--)
    solve();
    return 0;
}

