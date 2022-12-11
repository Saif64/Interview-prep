#include<bits/stdc++.h>

#define     pb      push_back
#define     eps     1e-9
#define     ff      first
#define     ss      second
#define     pi      acos(-1)
#define     inf     INT_MAX/2;
#define     INF     LLONG_MAX/2;
#define     mset(a,x)                    memset(a,(x),sizeof(a))
#define     all(x)                       x.begin(),x.end()
#define     allr(x)                      x.rbegin(),x.rend()
#define     Fast_Read                    ios_base::sync_with_stdio(false); cin.tie(nullptr);  cout.tie(nullptr);
#define     Precision(x)                 cout.setf(ios::fixed); cout.precision(x);

using namespace std;
typedef long double ld;
typedef long long ll;
typedef pair<int,int> pii;
typedef vector<int> vii;
typedef vector<ll> vll;
template < class T> inline T biton(T n,T pos){return n | ((T)1<<pos);}
template < class T> inline T bitoff(T n,T pos){return n & ~((T)1<<pos);}
template < class T> inline T ison(T n,T pos){return (bool)(n & ((T)1<<pos));}
template < class T> inline T gcd(T a, T b){while(b){a%=b;swap(a,b);}return a;}
inline int nxt(){int aaa;scanf("%d",&aaa);return aaa;}
inline ll lxt(){ll aaa;scanf("%lld",&aaa);return aaa;}
inline double dxt(){double aaa;scanf("%lf",&aaa);return aaa;}
template < class T> inline void vinput(T n,vector<T> &v){ for(T in,i=0;i<n;i++){cin>>in; v.push_back(in);} }
template < class T> inline void vout(vector<T> v){ for(auto it:v) cout<<it<<" "; cout<<endl; }
const ll M = 1e9+7;
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
int uniq = 0;
int K ;
int freq[100010];

struct Query{
    int index , L , R ;
    bool operator < (const Query &other) const{
        int block_own = L/K;
        int block_other = other.L/K;
        if(block_own == block_other)    return R < other.R ;
        return block_own < block_other ;
    }
};
Query query[50005];
void Add(int val){
    if(freq[val]==0)  uniq++;
    freq[val]++;
}
void Remove(int val){
    if(freq[val]==1)  uniq--;
    freq[val]--;
}
void solve()
{
    memset(query , 0 , sizeof query);
    memset(freq,0,sizeof freq);
    int n,q;
    cin>>n>>q;
    uniq = 0;
    vii v;
    vinput(n,v);
    for(int i=0;i<q;i++)
    {
        int l,r;
        cin>>l>>r;
        l--,r--;
        query[i].L = l;
        query[i].R = r;
        query[i].index = i;
    }
    K = sqrt(q);
    sort(query,query+q);
    int L=0,R=-1;
    vii ans(q);
    for(int i=0;i<q;i++)
    {
        while(R<query[i].R)     Add(v[++R]);
        while(L>query[i].L)     Add(v[--L]);
        while(R>query[i].R)     Remove(v[R--]);
        while(L<query[i].L)     Remove(v[L++]);
        ans[query[i].index] = uniq ;
    }
    cout<<"Case "<<++cs<<":"<<endl;
    for(auto it:ans)
        cout<<it<<endl;

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
