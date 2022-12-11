#include<bits/stdc++.h>

#define     pb      push_back
#define     eps     1e-9
#define     ff      first
#define     ss      second
#define     pi      acos(-1)
#define     inf     1e18
#define     mset(a,x)                    memset(a,(x),sizeof(a))
#define     all(x)                       x.begin(),x.end()
#define     allr(x)                      x.rbegin(),x.rend()
#define     Fast_Read                    ios_base::sync_with_stdio(false); cin.tie(nullptr);  cout.tie(nullptr);
#define     Precision(x)                 cout.setf(ios::fixed); cout.precision(x);

using namespace std;
typedef long double ld;
typedef long long ll;
typedef pair<int,int> pii;
inline int nxt(){int aaa;scanf("%d",&aaa);return aaa;}
inline ll lxt(){ll aaa;scanf("%lld",&aaa);return aaa;}
inline double dxt(){double aaa;scanf("%lf",&aaa);return aaa;}
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
int node,edge;
vector< vector< pair<int,int> > > adj;
vector<ll>dis;
vector<int>par;
void djkstra(int sp){
    priority_queue< pair<int,int> > pq;
    pq.push({0,sp});
    dis[sp]=0;
    while(!pq.empty())
    {
        auto top=pq.top();
        pq.pop();
        int u=top.ss;
        for(int i=0;i<adj[u].size();i++)
        {
            int v=adj[u][i].ff;
            if(dis[u]+adj[u][i].ss<dis[v])
            {
                dis[v]=dis[u]+adj[u][i].ss;
                pq.push({-dis[v],v});
                par[v]=u;
            }
        }
    }
}
void solve()
{
    cin>>node>>edge;
    adj.resize(node+1);
    dis.assign(node+1, inf);
    par.assign(node+1, -1);
    for(int i=0;i<edge;i++)
    {
        int u,v,x;
        cin>>u>>v>>x;
        adj[u].pb({v,x});
        adj[v].pb({u,x});
    }
    djkstra(1);
    int x=node;
    if(dis[x]==inf)
    {
        cout<<-1<<endl;
        return;
    }
    deque<int>dq;
    dq.push_front(x);
    while(par[x]!=-1)
    {
        int xx=par[x];
        dq.push_front(xx);
        x=xx;
    }
    while(!dq.empty())
    {
        int p=dq.front();
        dq.pop_front();
        cout<<p<<" ";
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
   // cin>>tc;
    while(tc--)
        solve();
    return 0;
}
