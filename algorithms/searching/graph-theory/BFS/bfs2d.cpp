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
bool vis[9][9];
int dis[9][9];
int X[8] = { 2, 1, -1, -2, -2, -1, 1, 2 };
int Y[8] = { 1, 2, 2, 1, -1, -2, -2, -1 };
void BFS(int spx,int spy)
{
    dis[spx][spy]=0;
    vis[spx][spy]=1;
    queue< pair<int,int> >q;
    q.push({spx,spy});
    while(!q.empty())
    {
        pair<int,int> x=q.front();
        q.pop();
        for(int i=0;i<8;i++)
        {
            int pp=x.ff+X[i];
            int qq=x.ss+Y[i];
            if(!vis[pp][qq] && pp>=0 && qq>=0 && pp<8 && qq<8)
            {
                q.push({pp,qq});
                vis[pp][qq]=1;
                dis[pp][qq]=dis[x.ff][x.ss]+1;
            }
        }
    }
}
int cs=0;
void solve()
{
    string sp,ep;
    while(cin>>sp>>ep)
    {
        int x,y;
        x=sp[0]-'a';
        y=sp[1]-'1';
        BFS(x,y);
        cout<<"To get from "<<sp<<" to "<<ep<<" takes "<<dis[ep[0]-'a'][ep[1]-'1']<<" knight moves."<<endl;
        memset(dis,0,sizeof dis);
        memset(vis,0,sizeof vis);

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
    ///cin>>tc;
    while(tc--)
        solve();
    return 0;
}
